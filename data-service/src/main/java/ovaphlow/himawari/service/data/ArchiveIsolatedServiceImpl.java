package ovaphlow.himawari.service.data;

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

public class ArchiveIsolatedServiceImpl extends ArchiveIsolatedServiceGrpc.ArchiveIsolatedServiceImplBase {
    private static final Logger logger = LoggerFactory.getLogger(ArchiveIsolatedServiceImpl.class);

    @Override
    public void filter(ArchiveIsolatedProto.FilterRequest req, StreamObserver<ArchiveIsolatedProto.Reply> responseObserver) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select * from himawari.archive_isolated " +
                    "where position(? in sn) > 0 " +
                    "or position(? in id_card) > 0 " +
                    "or position(? in name) > 0 " +
                    "limit 2000";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapListHandler(),
                    req.getFilter(), req.getFilter(), req.getFilter()));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        Gson gson = new Gson();
        ArchiveIsolatedProto.Reply reply = ArchiveIsolatedProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    public void save(ArchiveIsolatedProto.SaveRequest req, StreamObserver<ArchiveIsolatedProto.Reply> responseObserver) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "insert into " +
                    "himawari.archive_isolated (uuid, sn, sn_repeal, id_card, name, doc) " +
                    "values (?, ?, ?::json, ?, ?, ?::json) " +
                    "returning id";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    req.getUuid(), req.getSn(), req.getSnRepeal(), req.getIdCard(), req.getName(), req.getDoc()));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        Gson gson = new Gson();
        ArchiveIsolatedProto.Reply reply = ArchiveIsolatedProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    public void get(ArchiveIsolatedProto.GetRequest req, StreamObserver<ArchiveIsolatedProto.Reply> responseObserver) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select * from himawari.archive_isolated where id = ? and uuid = ? limit 1";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    req.getId(), req.getUuid()));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        Gson gson = new Gson();
        ArchiveIsolatedProto.Reply reply = ArchiveIsolatedProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    public void update(ArchiveIsolatedProto.UpdateRequest req, StreamObserver<ArchiveIsolatedProto.Reply> responseObserver) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "update himawari.archive_isolated " +
                    "set uuid = ?, id_card = ?, name = ?, doc = ?::json " +
                    "where id = ?";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.update(cnx, sql,
                    req.getUuid(), req.getId(), req.getName(), req.getDoc(), req.getId()));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        Gson gson = new Gson();
        ArchiveIsolatedProto.Reply reply = ArchiveIsolatedProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    public void remove(ArchiveIsolatedProto.RemoveRequest req, StreamObserver<ArchiveIsolatedProto.Reply> responseObserver) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "delete from himawari.archive_isolated where id = ? and uuid = ?";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.update(cnx, sql,
                    req.getId(), req.getUuid()));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        Gson gson = new Gson();
        ArchiveIsolatedProto.Reply reply = ArchiveIsolatedProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    public void transferIn(ArchiveIsolatedProto.TransferInRequest req, StreamObserver<ArchiveIsolatedProto.Reply> responseObserver) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "insert into " +
                    "himawari.archive_isolated (uuid, sn_repeal, id_card, name, doc) " +
                    "values (?, ?::json, ?, ?, ?::json) " +
                    "returning id";
            QueryRunner qr = new QueryRunner();
            Map<String, Object> result = qr.query(cnx, sql, new MapHandler(),
                    req.getUuid(), req.getSnRepeal(), req.getIdCard(), req.getName(), req.getDoc());
            sql = "delete from himawari.archive where id = ? and uuid = ?";
            qr.update(cnx, sql, req.getId(), req.getUuid());
            resp.put("content", result);
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        Gson gson = new Gson();
        ArchiveIsolatedProto.Reply reply = ArchiveIsolatedProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }
}
