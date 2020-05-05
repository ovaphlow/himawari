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

public class VaultServiceImpl extends VaultGrpc.VaultImplBase {
    private final static Logger logger = LoggerFactory.getLogger(VaultServiceImpl.class);

    @Override
    @SuppressWarnings("unchecked")
    public void list(VaultRequest req, StreamObserver<VaultReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select * from himawari.vault order by id desc";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapListHandler()));
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        VaultReply reply = VaultReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void save(VaultRequest req, StreamObserver<VaultReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "insert into himawari.vault " +
                    "(name, phone, addr) " +
                    "values (?, ?, ?) " +
                    "returning id";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    body.get("name").toString(),
                    body.get("phone").toString(),
                    body.get("addr").toString()));
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        VaultReply reply = VaultReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void get(VaultRequest req, StreamObserver<VaultReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select * from himawari.vault where id = ? limit 1";
            Double _id = Double.parseDouble(body.get("id").toString());
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    _id.intValue()));
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        VaultReply reply = VaultReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void update(VaultRequest req, StreamObserver<VaultReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "update himawari.vault " +
                    "set name = ?, phone = ?, addr = ? " +
                    "where id = ?";
            Double _id = Double.parseDouble(body.get("id").toString());
            QueryRunner qr = new QueryRunner();
            qr.update(cnx, sql,
                    body.get("name").toString(),
                    body.get("phone").toString(),
                    body.get("addr").toString(),
                    _id.intValue());
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        VaultReply reply = VaultReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void remove(VaultRequest req, StreamObserver<VaultReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "delete from himawari.vault where id = ?";
            Double _id = Double.parseDouble(body.get("id").toString());
            QueryRunner qr = new QueryRunner();
            qr.update(cnx, sql, _id.intValue());
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        VaultReply reply = VaultReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }
}
