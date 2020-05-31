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

public class UserServiceImpl extends UserServiceGrpc.UserServiceImplBase {
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Override
    @SuppressWarnings("unchecked")
    public void list(UserProto.UserRequest req, StreamObserver<UserProto.UserReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select u.id, u.dept_id, u.username, u.name, " +
                    "(select super from himawari.auth where user_id = u.id) as super, " +
                    "(select v from public.common where id = u.dept_id) as dept " +
                    "from public.user as u " +
                    "order by id desc limit 200";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapListHandler()));
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        UserProto.UserReply reply = UserProto.UserReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void filter(UserProto.UserRequest req, StreamObserver<UserProto.UserReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select u.id, u.dept_id, u.username, u.name, u.remark, c.v as dept, " +
                    "(select super from himawari.auth where user_id = u.id) as super " +
                    "from public.user as u left join public.common as c on c.id = u.dept_id " +
                    "where position(? in u.name) > 0 " +
                    "or position(? in u.username) > 0 " +
                    "or position(? in c.v) > 0 " +
                    "order by id desc limit 200";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapListHandler(),
                    body.get("filter_string").toString(),
                    body.get("filter_string").toString(),
                    body.get("filter_string").toString()));
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        UserProto.UserReply reply = UserProto.UserReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void save(UserProto.UserRequest req, StreamObserver<UserProto.UserReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "insert into public.user " +
                    "(username, password, name, dept_id, remark) " +
                    "values (?, ?, ?, ?, ?) " +
                    "returning id";
            Double _id = Double.parseDouble(body.get("dept_id").toString());
            QueryRunner qr = new QueryRunner();
            Map<String, Object> result = qr.query(cnx, sql, new MapHandler(),
                    body.get("username").toString(),
                    body.get("password").toString(),
                    body.get("name").toString(),
                    _id.intValue(),
                    body.get("remark").toString());
            resp.put("content", result);
            sql = "insert into himawari.auth " +
                    "(user_id, super) " +
                    "values (?, ?)";
            Double _auth_super = Double.parseDouble(body.get("auth_super").toString());
            qr.update(cnx, sql,
                    Integer.parseInt(result.get("id").toString()),
                    _auth_super.intValue());
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        UserProto.UserReply reply = UserProto.UserReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void get(UserProto.UserRequest req, StreamObserver<UserProto.UserReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select u.id, u.dept_id, u.username, u.name, u.remark, " +
                    "(select super from himawari.auth where user_id = u.id) as super, " +
                    "(select v from public.common where id = u.dept_id) as dept " +
                    "from public.user as u " +
                    "where id = ? limit 1";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    Integer.parseInt(body.get("id").toString())));
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        UserProto.UserReply reply = UserProto.UserReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void update(UserProto.UserRequest req, StreamObserver<UserProto.UserReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "update public.user " +
                    "set name = ?, username = ?, dept_id = ?, " +
                    "remark = ? " +
                    "where id = ?";
            Double _id = Double.parseDouble((body.get("id").toString()));
            Double _dept_id = Double.parseDouble(body.get("dept_id").toString());
            QueryRunner qr = new QueryRunner();
            qr.update(cnx, sql,
                    body.get("name").toString(),
                    body.get("username").toString(),
                    _dept_id.intValue(),
                    body.get("remark").toString(),
                    _id.intValue());
            sql = "update himawari.auth set super = ? where user_id = ?";
            Double _auth_super = Double.parseDouble(body.get("auth_super").toString());
            qr.update(cnx, sql,
                _auth_super.intValue(),
                _id.intValue());
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        UserProto.UserReply reply = UserProto.UserReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void remove(UserProto.UserRequest req, StreamObserver<UserProto.UserReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "delete from public.user where id = ?";
            Double _id = Double.parseDouble((body.get("id").toString()));
            QueryRunner qr = new QueryRunner();
            qr.update(cnx, sql, _id.intValue());
//            PreparedStatement ps = conn.prepareStatement(sql);
//            ps.setInt(1, id.intValue());
//            ps.execute();
            sql = "delete from himawari.auth where user_id = ?";
            qr.update(cnx, sql, _id.intValue());
//            ps = conn.prepareStatement(sql);
//            ps.clearParameters();
//            ps.setInt(1, id.intValue());
//            ps.execute();
//            conn.close();
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        UserProto.UserReply reply = UserProto.UserReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }
}
