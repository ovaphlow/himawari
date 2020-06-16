package ovaphlow.himawari.service.biz;

import com.google.gson.Gson;
import io.grpc.stub.StreamObserver;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.MapHandler;
import org.apache.commons.dbutils.handlers.MapListHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;

public class PictureServiceImpl extends PictureServiceGrpc.PictureServiceImplBase {
    private static final Logger logger = LoggerFactory.getLogger(PictureServiceImpl.class);

    @Override
    public void list(PictureProto.ListRequest req, StreamObserver<PictureProto.Reply> responseObserver) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select id, uuid, archive_id from himawari.picture where archive_id = ?";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapListHandler(),
                    req.getArchiveId()));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        Gson gson = new Gson();
        PictureProto.Reply reply = PictureProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    public void save(PictureProto.SaveRequest req, StreamObserver<PictureProto.Reply> responseObserver) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "insert into " +
                    "himawari.picture (uuid, archive_id, doc) " +
                    "values (?, ?, ?::json) " +
                    "returning id";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    req.getUuid(), req.getArchiveId(), req.getDoc()));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        Gson gson = new Gson();
        PictureProto.Reply reply = PictureProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    public void get(PictureProto.GetRequest req, StreamObserver<PictureProto.Reply> responseObserver) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select id, uuid, archive_id, doc, " +
                    "(select id from himawari.picture where id < ? order by id desc limit 1) as prev_id, " +
                    "(select id from himawari.picture where id > ? order by id limit 1) as next_id " +
                    "from himawari.picture " +
                    "where id = ? and uuid = ? and archive_id = ?";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    req.getId(), req.getId(), req.getId(), req.getUuid(), req.getArchiveId()));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        Gson gson = new Gson();
        PictureProto.Reply reply = PictureProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }
}
