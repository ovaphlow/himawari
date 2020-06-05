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
    public void filter(UserProto.FilterRequest req, StreamObserver<UserProto.Reply> responseObserver) {
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
                    req.getFilter(), req.getFilter(), req.getFilter()));
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
            String sql = "select u.id, u.dept_id, u.username, u.name, u.remark, " +
                    "(select super from himawari.auth where user_id = u.id) as super, " +
                    "(select v from public.common where id = u.dept_id) as dept " +
                    "from public.user as u " +
                    "where id = ? and uuid = ? " +
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
    public void remove(UserProto.RemoveRequest req, StreamObserver<UserProto.Reply> responseObserver) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            QueryRunner qr = new QueryRunner();
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
