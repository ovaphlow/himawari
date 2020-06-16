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

public class UserServiceImpl extends UserServiceGrpc.UserServiceImplBase {
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Override
    public void filter(UserProto.FilterRequest req, StreamObserver<UserProto.Reply> responseObserver) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select u.id, u.uuid, u.dept_id, u.username, u.auth_super, s.name as dept " +
                    "from himawari.user as u left join himawari.setting as s on s.id = u.dept_id " +
                    "where position(? in u.username) > 0 " +
                    "or position(? in s.name) > 0 " +
                    "order by u.id desc " +
                    "limit 200";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapListHandler(),
                    req.getFilter(), req.getFilter()));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        Gson gson = new Gson();
        UserProto.Reply reply = UserProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    public void get(UserProto.GetRequest req, StreamObserver<UserProto.Reply> responseObserver) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select u.id, u.uuid, u.dept_id, u.username, u.auth_super, c.name as dept " +
                    "from himawari.user as u left join himawari.setting as c on c.id = u.dept_id " +
                    "where u.id = ? and u.uuid = ?" +
                    "limit 1";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    req.getId(), req.getUuid()));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        Gson gson = new Gson();
        UserProto.Reply reply = UserProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    public void update(UserProto.UpdateRequest req, StreamObserver<UserProto.Reply> responseObserver) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "update himawari.user " +
                    "set uuid = ?, username = ?, dept_id = ?, auth_super = ? " +
                    "where id = ?";
            QueryRunner qr = new QueryRunner();
            qr.update(cnx, sql,
                    req.getUuid(), req.getUsername(), req.getDeptId(), req.getAuthSuper(), req.getId());
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        Gson gson = new Gson();
        UserProto.Reply reply = UserProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    public void remove(UserProto.RemoveRequest req, StreamObserver<UserProto.Reply> responseObserver) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "delete from himawari.user where id = ? and uuid = ?";
            QueryRunner qr = new QueryRunner();
            qr.update(cnx, sql, req.getId(), req.getUuid());
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        Gson gson = new Gson();
        UserProto.Reply reply = UserProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }
}
