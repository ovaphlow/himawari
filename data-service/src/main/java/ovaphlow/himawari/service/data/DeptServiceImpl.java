package ovaphlow.himawari.service.data;

import com.google.gson.Gson;
import io.grpc.stub.StreamObserver;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.MapHandler;
import org.apache.commons.dbutils.handlers.MapListHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.HashMap;
import java.util.Map;

public class DeptServiceImpl extends DeptGrpc.DeptImplBase {
    Logger logger = LoggerFactory.getLogger(DeptServiceImpl.class);

    @Override
    @SuppressWarnings("unchecked")
    public void list(DeptRequest req, StreamObserver<DeptReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select c.*, " +
                    "(select count(*) from public.user where dept_id = c.id) as qty_user " +
                    "from public.common as c " +
                    "where k = '部门' " +
                    "order by id desc " +
                    "limit 100";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapListHandler()));
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        DeptReply reply = DeptReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void save(DeptRequest req, StreamObserver<DeptReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "insert into public.common " +
                    "(master_id, k, v, remark) " +
                    "values (0, '部门', ?, ?) " +
                    "returning id";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    body.get("v").toString(),
                    body.get("remark").toString()));
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        DeptReply reply = DeptReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void get(DeptRequest req, StreamObserver<DeptReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select * from public.common where id = ?";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    Integer.parseInt(body.get("id").toString())));
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        DeptReply reply = DeptReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void update(DeptRequest req, StreamObserver<DeptReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "update public.common " +
                    "set v = ?, remark = ? " +
                    "where id = ?";
            Double _id = Double.parseDouble(body.get("id").toString());
            QueryRunner qr = new QueryRunner();
            qr.update(cnx, sql,
                    body.get("v").toString(),
                    body.get("remark").toString(),
                    _id.intValue());
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        DeptReply reply = DeptReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void remove(DeptRequest req, StreamObserver<DeptReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "delete from public.common where id = ?";
            QueryRunner qr = new QueryRunner();
            qr.update(cnx, sql, Integer.parseInt(body.get("id").toString()));
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        DeptReply reply = DeptReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }
}
