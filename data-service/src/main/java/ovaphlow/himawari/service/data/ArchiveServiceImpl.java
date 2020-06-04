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

public class ArchiveServiceImpl extends ArchiveServiceGrpc.ArchiveServiceImplBase {
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
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select * from himawari.archive " +
                    "where position(? in sn) > 0 " +
                    "or position(? in id_card) > 0 " +
                    "or position(? in name) > 0 " +
                    "limit 2000";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapListHandler(),
                    req.getFilter(), req.getFilter(), req.getFilter()));
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
    public void checkValid(ArchiveProto.CheckValidRequest req, StreamObserver<ArchiveProto.Reply> responseObserver) {
        logger.info("{} {}", req.getSn(), req.getIdCard());
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
                    req.getSn(), req.getIdCard()));
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
    public void checkValidWithId(ArchiveProto.CheckValidWithIdRequest req, StreamObserver<ArchiveProto.Reply> responseObserver) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select id, sn, sn_repeal, id_card " +
                    "from himawari.archive " +
                    "where (sn = ? or id_card = ?) and id != ? " +
                    "limit 2";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapListHandler(),
                    req.getSn(), req.getIdCard(), req.getId()));
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
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    req.getUuid(), req.getSn(), req.getIdCard(), req.getName(), req.getDoc()));
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
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "select * from himawari.archive where id = ? and uuid = ? limit 1";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    req.getId(), req.getUuid()));
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
    public void update(ArchiveProto.UpdateRequest req, StreamObserver<ArchiveProto.Reply> responseObserver) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "update himawari.archive " +
                    "set uuid = ?, sn = ?, id_card = ?, name = ?, doc = ?::json " +
                    "where id = ?";
            QueryRunner qr = new QueryRunner();
            qr.update(cnx, sql,
                    req.getUuid(), req.getSn(), req.getIdCard(), req.getName(), req.getDoc(), req.getId());
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
    public void remove(ArchiveProto.RemoveRequest req, StreamObserver<ArchiveProto.Reply> responseObserver) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "delete from himawari.archive where id = ? and uuid = ?";
            QueryRunner qr = new QueryRunner();
            qr.update(cnx, sql, req.getId(), req.getUuid());
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
    public void transferIn(ArchiveProto.TransferInRequest req, StreamObserver<ArchiveProto.Reply> responseObserver) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
            String sql = "insert into himawari.archive " +
                    "(uuid, sn, sn_repeal, id_card, name, doc) " +
                    "values " +
                    "(?, ?, ?::json, ?, ?, ?::json) " +
                    "returning id";
            QueryRunner qr = new QueryRunner();
            resp.put("content", qr.query(cnx, sql, new MapHandler(),
                    req.getUuid(), req.getSn(), req.getSnRepeal(), req.getIdCard(), req.getName(), req.getDoc()));
            sql = "delete from himawari.archive_isolated where id = ? and uuid = ?";
            qr.update(cnx, sql, req.getId(), req.getUuid());
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
    public void listPicture(ArchiveProto.ArchiveRequest req, StreamObserver<ArchiveProto.Reply> responseObserver) {
        Gson gson = new Gson();
        Map<String, Object> body = gson.fromJson(req.getData(), Map.class);
        Map<String, Object> resp = new HashMap<>();
        resp.put("message", "");
        resp.put("content", "");

        try (Connection cnx = DBUtil.getConnection()) {
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
}
