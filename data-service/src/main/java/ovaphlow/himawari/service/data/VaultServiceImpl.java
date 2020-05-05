package ovaphlow.himawari.service.data;

import com.google.gson.Gson;
import io.grpc.stub.StreamObserver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
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

        try {
            Connection conn = DBUtil.getConnection();
            String sql = "select * from himawari.vault order by id desc";
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            resp.put("content", DBUtil.getList(rs));
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
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
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try {
            Connection conn = DBUtil.getConnection();
            String sql = "insert into himawari.vault " +
                    "(name, phone, addr) " +
                    "values (?, ?, ?) " +
                    "returning id";
            PreparedStatement ps = conn.prepareStatement(sql);
            Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
            ps.setString(1, body.get("name").toString());
            ps.setString(2, body.get("phone").toString());
            ps.setString(3, body.get("addr").toString());
            ResultSet rs = ps.executeQuery();
            resp.put("content", DBUtil.getMap(rs));
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
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
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try {
            Connection conn = DBUtil.getConnection();
            String sql = "select * from himawari.vault where id = ? limit 1";
            PreparedStatement ps = conn.prepareStatement(sql);
            Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
            Double id = Double.parseDouble(body.get("id").toString());
            ps.setInt(1, id.intValue());
            ResultSet rs = ps.executeQuery();
            resp.put("content", DBUtil.getMap(rs));
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
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
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try {
            Connection conn = DBUtil.getConnection();
            String sql = "update himawari.vault " +
                    "set name = ?, phone = ?, addr = ? " +
                    "where id = ?";
            PreparedStatement ps = conn.prepareStatement(sql);
            Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
            ps.setString(1, body.get("name").toString());
            ps.setString(2, body.get("phone").toString());
            ps.setString(3, body.get("addr").toString());
            Double id = Double.parseDouble(body.get("id").toString());
            ps.setInt(4, id.intValue());
            ps.execute();
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
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
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try {
            Connection conn = DBUtil.getConnection();
            String sql = "delete from himawari.vault where id = ?";
            PreparedStatement ps = conn.prepareStatement(sql);
            Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
            Double id = Double.parseDouble(body.get("id").toString());
            ps.setInt(1, id.intValue());
            ps.execute();
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
            resp.put("message", "gRPC服务器错误");
        }

        VaultReply reply = VaultReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }
}
