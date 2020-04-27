package ovaphlow.himawari;

import com.google.gson.Gson;
import io.grpc.stub.StreamObserver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Map;

public class UserServiceImpl extends UserGrpc.UserImplBase {
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Override
    @SuppressWarnings("unchecked")
    public void list(UserRequest req, StreamObserver<UserReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try {
            Connection conn = DBUtil.getConn();
            String sql = "select u.id, u.dept_id, u.username, u.name, " +
                    "(select super from himawari.auth where user_id = u.id) as super, " +
                    "(select v from public.common where id = u.dept_id) as dept " +
                    "from public.user as u " +
                    "order by id desc limit 200";
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();

            resp.put("content", DBUtil.getList(rs));
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
            resp.put("message", "gRPC服务器错误");
        }

        UserReply reply = UserReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void save(UserRequest req, StreamObserver<UserReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try {
            Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
            Double d = Double.parseDouble(body.get("dept_id").toString());
            Connection conn = DBUtil.getConn();
            String sql = "insert into public.user " +
                    "(username, password, name, dept_id, remark) " +
                    "values (?, ?, ?, ?, ?) " +
                    "returning id";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, body.get("username").toString());
            ps.setString(2, body.get("password").toString());
            ps.setString(3, body.get("name").toString());
            ps.setInt(4, d.intValue());
            ps.setString(5, body.get("remark").toString());
            ResultSet rs = ps.executeQuery();
            Map<String, Object> map = DBUtil.getMap(rs);
            resp.put("content", map);
            sql = "insert into himawari.auth " +
                    "(user_id, super) " +
                    "values (?, ?)";
            ps = conn.prepareStatement(sql);
            ps.clearParameters();
            ps.setInt(1, Integer.parseInt(map.get("id").toString()));
            Double auth_super = Double.parseDouble(body.get("auth_super").toString());
            ps.setInt(2, auth_super.intValue());
            ps.execute();
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
            resp.put("message", "gRPC服务器错误");
        }

        UserReply reply = UserReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void get(UserRequest req, StreamObserver<UserReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try {
            Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
            Connection conn = DBUtil.getConn();
            String sql = "select u.id, u.dept_id, u.username, u.name, u.remark, " +
                    "(select super from himawari.auth where user_id = u.id) as super, " +
                    "(select v from public.common where id = u.dept_id) as dept " +
                    "from public.user as u " +
                    "where id = ? limit 1";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, Integer.parseInt(body.get("id").toString()));
            ResultSet rs = ps.executeQuery();
            resp.put("content", DBUtil.getMap(rs));
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
            resp.put("message", "gRPC服务器错误");
        }

        UserReply reply = UserReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void update(UserRequest req, StreamObserver<UserReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try {
            Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
            Double id = Double.parseDouble((body.get("id").toString()));
            Double dept_id = Double.parseDouble(body.get("dept_id").toString());
            Connection conn = DBUtil.getConn();
            String sql = "update public.user " +
                    "set name = ?, username = ?, dept_id = ?, " +
                    "remark = ? " +
                    "where id = ?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, body.get("name").toString());
            ps.setString(2, body.get("username").toString());
            ps.setInt(3, dept_id.intValue());
            ps.setString(4, body.get("remark").toString());
            ps.setInt(5, id.intValue());
            ps.execute();
            sql = "update himawari.auth set super = ? where user_id = ?";
            ps = conn.prepareStatement(sql);
            ps.clearParameters();
            Double auth_super = Double.parseDouble(body.get("auth_super").toString());
            ps.setInt(1, auth_super.intValue());
            ps.setInt(2, id.intValue());
            ps.execute();
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
            resp.put("message", "gRPC服务器错误");
        }

        UserReply reply = UserReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void remove(UserRequest req, StreamObserver<UserReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try {
            Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
            Double id = Double.parseDouble((body.get("id").toString()));
            Connection conn = DBUtil.getConn();
            String sql = "delete from public.user where id = ?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, id.intValue());
            ps.execute();
            sql = "delete from himawari.auth where user_id = ?";
            ps = conn.prepareStatement(sql);
            ps.clearParameters();
            ps.setInt(1, id.intValue());
            ps.execute();
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
            resp.put("message", "gRPC服务器错误");
        }

        UserReply reply = UserReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }
}
