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
import java.util.List;
import java.util.Map;

public class ArchiveServiceImpl extends ArchiveGrpc.ArchiveImplBase {
    private static final Logger logger = LoggerFactory.getLogger(ArchiveServiceImpl.class);

    @Override
    public void search(ArchiveProto.SearchRequest req, StreamObserver<ArchiveProto.Reply> responseObserver) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select * from himawari.archive " +
                    "where sn = ? or id_card = ? or position(? in sn_repeal) > 0" +
                    "limit 2";
            QueryRunner qr = new QueryRunner();
            List<Map<String, Object>> result = qr.query(cnx, sql, new MapListHandler(),
                    req.getFilter());
            if (result.size() == 0) {
                resp.put("message", "未找到指定档案号/身份证的档案");
                resp.put("content", req.getFilter());
            } else if (result.size() == 1) {
                resp.put("message", "");
                resp.put("content", result.get(0));
            } else {
                resp.put("message", "您查询的档案号/身份证不是唯一数据，请联系系统管理员。");
                resp.put("content", req.getFilter());
            }
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        Gson gson = new Gson();
        ArchiveProto.Reply reply = ArchiveProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    public void filter(ArchiveProto.FilterRequest req, StreamObserver<ArchiveProto.Reply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select * from himawari.archive " +
                    "where position(? in sn) > 0 " +
                    "and position(? in id_card) > 0 " +
                    "and position(? in name) > 0 " +
                    "limit 2000";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapListHandler(),
                    req.getFilter(), req.getFilter(), req.getFilter()));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveProto.Reply reply = ArchiveProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void checkValid(ArchiveProto.ArchiveRequest req, StreamObserver<ArchiveProto.Reply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select id, sn, sn_repeal, id_card " +
                    "from himawari.archive " +
                    "where sn = ? or id_card = ? " +
                    "limit 2";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapListHandler(),
                    body.get("sn").toString(),
                    body.get("id_card").toString()));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveProto.Reply reply = ArchiveProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void checkValidWithId(ArchiveProto.ArchiveRequest req, StreamObserver<ArchiveProto.Reply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select id, sn, sn_repeal, id_card " +
                    "from himawari.archive " +
                    "where (sn = ? or id_card = ?) and id != ? " +
                    "limit 2";
            double id = Double.parseDouble(body.get("id").toString());
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapListHandler(),
                    body.get("sn").toString(),
                    body.get("id_card").toString(),
                    (int) id));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveProto.Reply reply = ArchiveProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    public void list(ArchiveProto.ArchiveRequest req, StreamObserver<ArchiveProto.Reply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select * from himawari.archive order by id desc limit 200";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapListHandler()));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveProto.Reply reply = ArchiveProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    public void save(ArchiveProto.SaveRequest req, StreamObserver<ArchiveProto.Reply> responseObserver) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "insert into himawari.archive " +
                    "(uuid, sn, id_card, name, doc) " +
                    "values " +
                    "(?, ?, ?, ?, ?::json) " +
                    "returning id";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler()
                    ));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        Gson gson = new Gson();
        ArchiveProto.Reply reply = ArchiveProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    public void get(ArchiveProto.GetRequest req, StreamObserver<ArchiveProto.Reply> responseObserver) {
        logger.info("{}", req.getId());
        logger.info("{}", req.getUuid());
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select * from himawari.archive where id = ? and uuid = ? limit 1";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    req.getId(),
                    req.getUuid()));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        Gson gson = new Gson();
        ArchiveProto.Reply reply = ArchiveProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void update(ArchiveProto.ArchiveRequest req, StreamObserver<ArchiveProto.Reply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "update himawari.archive " +
                    "set sn = ?, id_card = ?, name = ?, doc = ?::json " +
                    "where id = ? and uuid = ?";
            double id = Double.parseDouble(body.get("id").toString());
            QueryRunner qr = new QueryRunner();
            qr.update(cnx, sql,
                    body.get("sn").toString(),
                    body.get("id_card").toString(),
                    body.get("name").toString(),
                    body.get("doc").toString(),
                    (int) id,
                    body.get("uuid").toString());
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveProto.Reply reply = ArchiveProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void remove(ArchiveProto.ArchiveRequest req, StreamObserver<ArchiveProto.Reply> responseObserver) {
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
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveProto.Reply reply = ArchiveProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void transferIn(ArchiveProto.ArchiveRequest req, StreamObserver<ArchiveProto.Reply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "insert into himawari.archive " +
                    "(sn, sn_repeal, id_card, name, bday, " +
                    "remark, vault_id, tel, gender) " +
                    "values " +
                    "(?, ?, ?, ?, ?, " +
                    "?, ?, ?, ?) " +
                    "returning id";
            double vault_id = Double.parseDouble((body.get("vault_id").toString()));
            double id = Double.parseDouble(body.get("id").toString());
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    body.get("sn").toString(),
                    body.get("sn_repeal").toString(),
                    body.get("id_card").toString(),
                    body.get("name").toString(),
                    body.get("bday").toString(),
                    body.get("remark").toString(),
                    (int) vault_id,
                    body.get("tel").toString(),
                    body.get("gender").toString()));
            sql = "delete from himawari.archive_isolate where id = ?";
            qr.update(cnx, sql, (int) id);
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveProto.Reply reply = ArchiveProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void transferOut(ArchiveProto.ArchiveRequest req, StreamObserver<ArchiveProto.Reply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "insert into himawari.archive_isolate " +
                    "(original_id, sn, sn_repeal, id_card, name, bday, " +
                    "remark, vault_id, reason, gender) " +
                    "values " +
                    "(?, ?, ?, ?, ?, ?, " +
                    "?, ?, ?, ?) " +
                    "returning id";
            double vault_id = Double.parseDouble((body.get("vault_id").toString()));
            double id = Double.parseDouble(body.get("id").toString());
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    body.get("sn").toString(),
                    body.get("sn_repeal").toString(),
                    body.get("id_card").toString(),
                    body.get("name").toString(),
                    body.get("bday").toString(),
                    body.get("remark").toString(),
                    (int) vault_id,
                    body.get("reason").toString(),
                    body.get("gender").toString()));
            sql = "delete from himawari.archive where id = ?";
            qr.update(cnx, sql, (int) id);
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveProto.Reply reply = ArchiveProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void listPicture(ArchiveProto.ArchiveRequest req, StreamObserver<ArchiveProto.Reply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
//            String sql = "select id, master_id, content from himawari.picture where master_id = ?";
            String sql = "select id, master_id from himawari.picture where master_id = ?";
            double id = Double.parseDouble(body.get("id").toString());
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapListHandler(),
                    (int) id));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveProto.Reply reply = ArchiveProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void saveBase64(ArchiveProto.ArchiveRequest req, StreamObserver<ArchiveProto.Reply> responseObserver) {
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
            double id = Double.parseDouble(body.get("master_id").toString());
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    (int) id,
                    body.get("content").toString()));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveProto.Reply reply = ArchiveProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void getPicture(ArchiveProto.ArchiveRequest req, StreamObserver<ArchiveProto.Reply> responseObserver) {
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
            double id = Double.parseDouble(body.get("id").toString());
            double master_id = Double.parseDouble(body.get("master_id").toString());
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    (int) id,
                    (int) id,
                    (int) id,
                    (int) master_id));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveProto.Reply reply = ArchiveProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    public void listIsolate(ArchiveProto.ArchiveRequest req, StreamObserver<ArchiveProto.Reply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select * from himawari.archive_isolate order by id desc limit 2000";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapListHandler()));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveProto.Reply reply = ArchiveProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void getIsolate(ArchiveProto.ArchiveRequest req, StreamObserver<ArchiveProto.Reply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select * from himawari.archive_isolate where id = ? limit 1";
            double id = Double.parseDouble(body.get("id").toString());
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    (int) id));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveProto.Reply reply = ArchiveProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void updateIsolate(ArchiveProto.ArchiveRequest req, StreamObserver<ArchiveProto.Reply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "update himawari.archive_isolate " +
                    "set sn = ?, sn_repeal = ?, id_card = ?, name = ?, bday = ?, " +
                    "remark = ?, vault_id = ?, " +
                    "reason = ?, tel = ?, gender = ? " +
                    "where id = ?";
            double vault_id = Double.parseDouble(body.get("vault_id").toString());
            double id = Double.parseDouble(body.get("id").toString());
            QueryRunner qr = new QueryRunner();
            qr.update(cnx, sql,
                    body.get("sn").toString(),
                    body.get("sn_repeal").toString(),
                    body.get("id_card").toString(),
                    body.get("name").toString(),
                    body.get("bday").toString(),
                    body.get("remark").toString(),
                    (int) vault_id,
                    body.get("reason").toString(),
                    body.get("tel").toString(),
                    body.get("gender").toString(),
                    (int) id);
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveProto.Reply reply = ArchiveProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void removeIsolate(ArchiveProto.ArchiveRequest req, StreamObserver<ArchiveProto.Reply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "delete from himawari.archive_isolate where id = ?";
            double _id = Double.parseDouble(body.get("id").toString());
            QueryRunner qr = new QueryRunner();
            qr.update(cnx, sql, (int) _id);
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveProto.Reply reply = ArchiveProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }

    @Override
    @SuppressWarnings("unchecked")
    public void filterIsolate(ArchiveProto.ArchiveRequest req, StreamObserver<ArchiveProto.Reply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select * from himawari.archive_isolate " +
                    "where position(? in sn) > 0 " +
                    "and position(? in id_card) > 0 " +
                    "and position(? in name) > 0 " +
                    "limit 2000";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapListHandler(),
                    body.get("sn").toString(),
                    body.get("id_card").toString(),
                    body.get("name").toString()));
        } catch (Exception e) {
            logger.error("", e);
            resp.put("message", "gRPC服务器错误");
        }

        ArchiveProto.Reply reply = ArchiveProto.Reply.newBuilder().setData(gson.toJson(resp)).build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }
}
