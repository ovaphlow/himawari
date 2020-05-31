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

public class SettingServiceImpl extends SettingGrpc.SettingImplBase {
    private static final Logger logger = LoggerFactory.getLogger(SettingServiceImpl.class);

    @Override
    public void list(SettingProto.ListRequest req, StreamObserver<SettingProto.SettingReply> responseObserver) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select * from himawari.setting where master_id = 0 and category = ?";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapListHandler(),
                    req.getCat()));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        Gson gson = new Gson();
        SettingProto.SettingReply reply = SettingProto.SettingReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    public void save(SettingProto.SaveRequest req, StreamObserver<SettingProto.SettingReply> responseObserver) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "insert into " +
                    "himawari.setting (uuid, master_id, category, name, value, doc) " +
                    "values (?, ?, ?, ?, ?, ?::json) " +
                    "returning id";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    req.getUuid(), req.getMasterId(), req.getCategory(), req.getName(), req.getValue(),
                    req.getDoc()));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        Gson gson = new Gson();
        SettingProto.SettingReply reply = SettingProto.SettingReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    public void get(SettingProto.GetRequest req, StreamObserver<SettingProto.SettingReply> responseObserver) {
        logger.info("{} {}", req.getId(), req.getUuid());
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select * from himawari.setting where id = ? and uuid = ? limit 1";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    req.getId(), req.getUuid()));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        Gson gson = new Gson();
        SettingProto.SettingReply reply = SettingProto.SettingReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    public void update(SettingProto.UpdateRequest req, StreamObserver<SettingProto.SettingReply> responseObserver) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "update himawari.setting " +
                    "set uuid = ?, master_id = ?, category = ?, name = ?, value = ?, doc = ?::jsonb " +
                    "where id = ?";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.update(cnx, sql,
                    req.getUuid(), req.getMasterId(), req.getCategory(), req.getName(), req.getValue(),
                    req.getDoc(), req.getId()));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        Gson gson = new Gson();
        SettingProto.SettingReply reply = SettingProto.SettingReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    public void remove(SettingProto.RemoveRequest req, StreamObserver<SettingProto.SettingReply> responseObserver) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "delete from himawari.setting where id = ? and uuid = ?";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.update(cnx, sql, req.getId(), req.getUuid()));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        Gson gson = new Gson();
        SettingProto.SettingReply reply = SettingProto.SettingReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }
}
