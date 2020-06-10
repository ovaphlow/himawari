package ovaphlow.himawari.service.data;

import com.google.gson.Gson;
import io.grpc.stub.StreamObserver;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.MapHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;

public class CurrentUserServiceImpl extends CurrentUserServiceGrpc.CurrentUserServiceImplBase {
    private static final Logger logger = LoggerFactory.getLogger(CurrentUserServiceImpl.class);

    @Override
    public void signUp(CurrentUserProto.SignUpRequest req, StreamObserver<CurrentUserProto.Reply> responseObserver) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select count(*) as qty from himawari.user where username = ?";
            QueryRunner qr = new QueryRunner();
            Map<String, Object> result = qr.query(cnx, sql, new MapHandler(),
                    req.getUsername());
            if ("0".equals(result.get("qty").toString())) {
                sql = "insert into " +
                        "himawari.user (uuid, username, password, salt) " +
                        "values (?, ?, ?, ?) " +
                        "returning id";
                resp.put("content", qr.query(cnx, sql, new MapHandler(),
                        req.getUuid(), req.getUsername(), req.getPassword(), req.getSalt()));
            } else {
                resp.put("message", "用户不存在或用户名/密码输入错误");
            }
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        Gson gson = new Gson();
        CurrentUserProto.Reply reply = CurrentUserProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    public void signIn(CurrentUserProto.SignInRequest req, StreamObserver<CurrentUserProto.Reply> responseObserver) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select * from himawari.user where username = ?";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    req.getUsername()));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        Gson gson = new Gson();
        CurrentUserProto.Reply reply = CurrentUserProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    public void getSalt(CurrentUserProto.GetSaltRequest req, StreamObserver<CurrentUserProto.Reply> responseObserver) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select password, salt from himawari.user where id = ? and uuid = ?";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    req.getId(), req.getUuid()));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        Gson gson = new Gson();
        CurrentUserProto.Reply reply = CurrentUserProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    public void updatePassword(CurrentUserProto.UpdatePasswordRequest req, StreamObserver<CurrentUserProto.Reply> responseObserver) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "update himawari.user set password = ? where id = ? and uuid = ?";
            QueryRunner qr = new QueryRunner();
            qr.update(cnx, sql, req.getNewPassword(), req.getId(), req.getUuid());
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        Gson gson = new Gson();
        CurrentUserProto.Reply reply = CurrentUserProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }
}
