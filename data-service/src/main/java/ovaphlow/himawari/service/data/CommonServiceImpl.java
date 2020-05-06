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

public class CommonServiceImpl extends CommonGrpc.CommonImplBase {
    private static final Logger logger = LoggerFactory.getLogger(CommonServiceImpl.class);

    @Override
    @SuppressWarnings("unchecked")
    public void list(CommonRequest req, StreamObserver<CommonReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select * from public.common " +
                    "where master_id = 0 and category = ? " +
                    "order by id desc";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapListHandler(),
                    body.get("category").toString()));
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        CommonReply reply = CommonReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void save(CommonRequest req, StreamObserver<CommonReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "insert into public.common " +
                    "(master_id, category, name, value, remark) " +
                    "values (?, ?, ?, ?, ?) " +
                    "returning id";
            Double master_id = Double.parseDouble(body.get("master_id").toString());
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    master_id.intValue(),
                    body.get("category").toString(),
                    body.get("name").toString(),
                    body.get("value").toString(),
                    body.get("value").toString()));
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        CommonReply reply = CommonReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void get(CommonRequest req, StreamObserver<CommonReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select * from public.common where id = ? limit 1";
            Double id = Double.parseDouble(body.get("id").toString());
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    id.intValue()));
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        CommonReply reply = CommonReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void update(CommonRequest req, StreamObserver<CommonReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "update public.common " +
                    "set master_id = ?, category = ?, name = ?, value = ?, remark = ? " +
                    "where id = ?";
            Double id = Double.parseDouble(body.get("id").toString());
            Double master_id = Double.parseDouble(body.get("master_id").toString());
            QueryRunner qr = new QueryRunner();
            qr.update(cnx, sql,
                    master_id.intValue(),
                    body.get("category").toString(),
                    body.get("name").toString(),
                    body.get("value").toString(),
                    body.get("remark").toString(),
                    id.intValue());
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        CommonReply reply = CommonReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void remove(CommonRequest req, StreamObserver<CommonReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "delete from public.common where id = ?";
            Double id = Double.parseDouble(body.get("id").toString());
            QueryRunner qr = new QueryRunner();
            qr.update(cnx, sql, id.intValue());
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        CommonReply reply = CommonReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }
}
