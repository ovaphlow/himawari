package ovaphlow.himawari.service.data;

import com.google.gson.Gson;
import io.grpc.stub.StreamObserver;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.MapHandler;
import org.apache.commons.dbutils.handlers.MapListHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.awt.desktop.QuitEvent;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ArchiveServiceImpl extends ArchiveGrpc.ArchiveImplBase {
    private static final Logger logger = LoggerFactory.getLogger(ArchiveServiceImpl.class);

    /**
     * 20200424 调整写法
     * @param req
     * @param responseObserver
     */
    @Override
    @SuppressWarnings("unchecked")
    public void search(ArchiveRequest req, StreamObserver<ArchiveReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select * from himawari.archive " +
                    "where sn = ? or identity = ? or position(? in sn_alt) > 0" +
                    "limit 2";
            QueryRunner qr = new QueryRunner();
            List<Map<String, Object>> result = qr.query(cnx, sql, new MapListHandler(),
                    body.get("keyword").toString(),
                    body.get("keyword").toString(),
                    body.get("keyword").toString());
            if (result.size() == 0) {
                resp.put("message", "未找到指定档案号/身份证的档案");
                resp.put("content", body.get("keyword").toString());
            } else if (result.size() == 1) {
                resp.put("message", "");
                resp.put("content", result.get(0));
            } else {
                resp.put("message", "您查询的档案号/身份证不是唯一数据，请联系系统管理员。");
                resp.put("content", body.get("keyword").toString());
            }
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveReply reply = ArchiveReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void filter(ArchiveRequest req, StreamObserver<ArchiveReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select * from himawari.archive " +
                    "where position(? in sn) > 0 " +
                    "and position(? in identity) > 0 " +
                    "and position(? in name) > 0 " +
                    "limit 2000";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapListHandler(),
                    body.get("sn").toString(),
                    body.get("identity").toString(),
                    body.get("name").toString()));
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveReply reply = ArchiveReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void checkValid(ArchiveRequest req, StreamObserver<ArchiveReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select id, sn, sn_alt, identity " +
                    "from himawari.archive " +
                    "where sn = ? or identity = ? " +
                    "limit 2";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapListHandler(),
                    body.get("sn").toString(),
                    body.get("identity").toString()));
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveReply reply = ArchiveReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void checkValidWithId(ArchiveRequest req, StreamObserver<ArchiveReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select id, sn, sn_alt, identity " +
                    "from himawari.archive " +
                    "where (sn = ? or identity = ?) and id != ? " +
                    "limit 2";
            Double _id = Double.parseDouble(body.get("id").toString());
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapListHandler(),
                    body.get("sn").toString(),
                    body.get("identity").toString(),
                    _id.intValue()));
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveReply reply = ArchiveReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void list(ArchiveRequest req, StreamObserver<ArchiveReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select * from himawari.archive order by id desc limit 200";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapListHandler()));
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveReply reply = ArchiveReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void save(ArchiveRequest req, StreamObserver<ArchiveReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "insert into himawari.archive " +
                    "(sn, sn_alt, identity, name, birthday, " +
                    "cangongshijian, zhicheng, gongling, yutuixiuriqi, tuixiuriqi, vault_id, " +
                    "remark, phone, gender) " +
                    "values " +
                    "(?, ?, ?, ?, ?, " +
                    "?, ?, ?, ?, ?, ?, " +
                    "?, ?, ?) " +
                    "returning id";
            Double _vault_id = Double.parseDouble(body.get("vault_id").toString());
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    body.get("sn").toString(),
                    body.get("sn_alt").toString(),
                    body.get("identity").toString(),
                    body.get("name").toString(),
                    body.get("birthday").toString(),
                    body.get("cangongshijian").toString(),
                    body.get("zhicheng").toString(),
                    body.get("gongling").toString(),
                    body.get("yutuixiuriqi").toString(),
                    body.get("tuixiuriqi").toString(),
                    _vault_id.intValue(),
                    body.get("remark").toString(),
                    body.get("phone").toString(),
                    body.get("gender").toString()));
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveReply reply = ArchiveReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void get(ArchiveRequest req, StreamObserver<ArchiveReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select * from himawari.archive where id = ? limit 1";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    Integer.parseInt(body.get("id").toString())));
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveReply reply = ArchiveReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void update(ArchiveRequest req, StreamObserver<ArchiveReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "update himawari.archive " +
                    "set sn = ?, sn_alt = ?, " +
                    "identity = ?, name = ?, birthday = ?, " +
                    "cangongshijian = ?, zhicheng = ?, gongling = ?, " +
                    "yutuixiuriqi = ?, tuixiuriqi = ?, vault_id = ?, " +
                    "remark = ?, phone = ?, gender = ? " +
                    "where id = ?";
            Double _vault_id = Double.parseDouble(body.get("vault_id").toString());
            Double _id = Double.parseDouble(body.get("id").toString());
            QueryRunner qr = new QueryRunner();
            qr.update(cnx, sql,
                    body.get("sn").toString(),
                    body.get("sn_alt").toString(),
                    body.get("identity").toString(),
                    body.get("name").toString(),
                    body.get("birthday").toString(),
                    body.get("cangongshijian").toString(),
                    body.get("zhicheng").toString(),
                    body.get("gongling").toString(),
                    body.get("yutuixiuriqi").toString(),
                    body.get("tuixiuriqi").toString(),
                    _vault_id.intValue(),
                    body.get("remark").toString(),
                    body.get("phone").toString(),
                    body.get("gender").toString(),
                    _id.intValue());
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveReply reply = ArchiveReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void remove(ArchiveRequest req, StreamObserver<ArchiveReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "delete from himawari.archive where id = ?";
            QueryRunner qr = new QueryRunner();
            qr.update(cnx, sql, Integer.parseInt(body.get("id").toString()));
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveReply reply = ArchiveReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void transferIn(ArchiveRequest req, StreamObserver<ArchiveReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "insert into himawari.archive " +
                    "(sn, sn_alt, identity, name, birthday, " +
                    "cangongshijian, zhicheng, gongling, yutuixiuriqi, tuixiuriqi, " +
                    "remark, vault_id, phone, gender) " +
                    "values " +
                    "(?, ?, ?, ?, ?, " +
                    "?, ?, ?, ?, ?, " +
                    "?, ?, ?, ?) " +
                    "returning id";
            Double _vault_id = Double.parseDouble((body.get("vault_id").toString()));
            Double _id = Double.parseDouble(body.get("id").toString());
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    body.get("sn").toString(),
                    body.get("sn_alt").toString(),
                    body.get("identity").toString(),
                    body.get("name").toString(),
                    body.get("birthday").toString(),
                    body.get("cangongshijian").toString(),
                    body.get("zhicheng").toString(),
                    body.get("gongling").toString(),
                    body.get("yutuixiuriqi").toString(),
                    body.get("tuixiuriqi").toString(),
                    body.get("remark").toString(),
                    _vault_id.intValue(),
                    body.get("phone").toString(),
                    body.get("gender").toString()));
            sql = "delete from himawari.archive_isolate where id = ?";
            qr.update(cnx, sql, _id.intValue());
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveReply reply = ArchiveReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void transferOut(ArchiveRequest req, StreamObserver<ArchiveReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "insert into himawari.archive_isolate " +
                    "(original_id, sn, sn_alt, identity, name, birthday, " +
                    "cangongshijian, zhicheng, gongling, yutuixiuriqi, tuixiuriqi, " +
                    "remark, vault_id, reason, gender) " +
                    "values " +
                    "(?, ?, ?, ?, ?, ?, " +
                    "?, ?, ?, ?, ?, " +
                    "?, ?, ?, ?) " +
                    "returning id";
            Double _vault_id = Double.parseDouble((body.get("vault_id").toString()));
            Double _id = Double.parseDouble(body.get("id").toString());
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    body.get("sn").toString(),
                    body.get("sn_alt").toString(),
                    body.get("identity").toString(),
                    body.get("name").toString(),
                    body.get("birthday").toString(),
                    body.get("cangongshijian").toString(),
                    body.get("zhicheng").toString(),
                    body.get("gongling").toString(),
                    body.get("yutuixiuriqi").toString(),
                    body.get("tuixiuriqi").toString(),
                    body.get("remark").toString(),
                    _vault_id.intValue(),
                    body.get("reason").toString(),
                    body.get("gender").toString()));
            sql = "delete from himawari.archive where id = ?";
            qr.update(cnx, sql, _id.intValue());
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveReply reply = ArchiveReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void listPicture(ArchiveRequest req, StreamObserver<ArchiveReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
//            String sql = "select id, master_id, content from himawari.picture where master_id = ?";
            String sql = "select id, master_id from himawari.picture where master_id = ?";
            Double _id = Double.parseDouble(body.get("id").toString());
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapListHandler(),
                    _id.intValue()));
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveReply reply = ArchiveReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void saveBase64(ArchiveRequest req, StreamObserver<ArchiveReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "insert into himawari.picture " +
                    "(master_id, content) " +
                    "values (?, ?) " +
                    "returning id";
            Double _id = Double.parseDouble(body.get("master_id").toString());
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    _id.intValue(),
                    body.get("content").toString()));
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveReply reply = ArchiveReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void getPicture(ArchiveRequest req, StreamObserver<ArchiveReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select id, master_id, content, " +
                    "(select id from himawari.picture where id < ? order by id desc limit 1) as prev_id, " +
                    "(select id from himawari.picture where id > ? order by id limit 1) as next_id " +
                    "from himawari.picture " +
                    "where id = ? and master_id = ?";
            Double _id = Double.parseDouble(body.get("id").toString());
            Double _master_id = Double.parseDouble(body.get("master_id").toString());
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    _id.intValue(),
                    _id.intValue(),
                    _id.intValue(),
                    _master_id.intValue()));
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveReply reply = ArchiveReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void listIsolate(ArchiveRequest req, StreamObserver<ArchiveReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select * from himawari.archive_isolate order by id desc limit 2000";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapListHandler()));
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveReply reply = ArchiveReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void getIsolate(ArchiveRequest req, StreamObserver<ArchiveReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select * from himawari.archive_isolate where id = ? limit 1";
            Double _id = Double.parseDouble(body.get("id").toString());
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    _id.intValue()));
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveReply reply = ArchiveReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void updateIsolate(ArchiveRequest req, StreamObserver<ArchiveReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "update himawari.archive_isolate " +
                    "set sn = ?, sn_alt = ?, identity = ?, name = ?, birthday = ?, " +
                    "cangongshijian = ?, zhicheng = ?, gongling = ?, " +
                    "yutuixiuriqi = ?, tuixiuriqi = ?, " +
                    "remark = ?, vault_id = ?, " +
                    "reason = ?, phone = ?, gender = ? " +
                    "where id = ?";
            Double _vault_id = Double.parseDouble(body.get("vault_id").toString());
            Double _id = Double.parseDouble(body.get("id").toString());
            QueryRunner qr = new QueryRunner();
            qr.update(cnx, sql,
                    body.get("sn").toString(),
                    body.get("sn_alt").toString(),
                    body.get("identity").toString(),
                    body.get("name").toString(),
                    body.get("birthday").toString(),
                    body.get("cangongshijian").toString(),
                    body.get("zhicheng").toString(),
                    body.get("gongling").toString(),
                    body.get("yutuixiuriqi").toString(),
                    body.get("tuixiuriqi").toString(),
                    body.get("remark").toString(),
                    _vault_id.intValue(),
                    body.get("reason").toString(),
                    body.get("phone").toString(),
                    body.get("gender").toString(),
                    _id.intValue());
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveReply reply = ArchiveReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void removeIsolate(ArchiveRequest req, StreamObserver<ArchiveReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "delete from himawari.archive_isolate where id = ?";
            Double _id = Double.parseDouble(body.get("id").toString());
            QueryRunner qr = new QueryRunner();
            qr.update(cnx, sql, _id.intValue());
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveReply reply = ArchiveReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void filterIsolate(ArchiveRequest req, StreamObserver<ArchiveReply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select * from himawari.archive_isolate " +
                    "where position(? in sn) > 0 " +
                    "and position(? in identity) > 0 " +
                    "and position(? in name) > 0 " +
                    "limit 2000";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapListHandler(),
                    body.get("sn").toString(),
                    body.get("identity").toString(),
                    body.get("name").toString()));
        } catch (Exception e) {
            logger.error("{}", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveReply reply = ArchiveReply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }
}
