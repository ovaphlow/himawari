package ovaphlow.himawari.service.misc

import com.google.gson.Gson
import org.apache.commons.dbutils.QueryRunner
import org.apache.commons.dbutils.handlers.MapHandler
import org.apache.commons.dbutils.handlers.MapListHandler
import org.slf4j.Logger
import org.slf4j.LoggerFactory

class MessageServiceImpl: MessageGrpcKt.MessageCoroutineImplBase() {
    val logger: Logger = LoggerFactory.getLogger(MessageServiceImpl::class.java)

    override suspend fun save(request: SaveMessageRequest): Reply {
        val resp = hashMapOf<String, Any>("message" to "", "content" to "")
        try {
            val qr = QueryRunner()
            val cnx = Postgres.connection
            val sql = """
                insert into
                    himawari.message (uuid, user_id, doc)
                    values (?, ?, ?::jsonb)
                returning id
            """.trimIndent()
            resp["content"] = qr.query(cnx, sql, MapHandler(), request.uuid, request.userId, request.doc)
            cnx.close()
        } catch (e: Exception) {
            logger.error("", e)
            resp["message"] = "gRPC服务错误"
        }
        return Reply.newBuilder().setData(Gson().toJson(resp)).build()
    }

    override suspend fun list(request: ListMessageRequest): Reply {
        val resp = hashMapOf<String, Any>("message" to "", "content" to "")
        try {
            val qr = QueryRunner()
            val cnx = Postgres.connection
            val sql = """
                select id, uuid, user_id,
                    doc->>'status' "status", doc->>'date_time' date_time, doc->>'send_by' send_by,
                    doc->>'title' title, doc->>'content' "content"
                from himawari.message
                where user_id = ?
                    and doc @> ?::jsonb
                order by id desc
                limit 100
            """.trimIndent()
            resp["content"] = qr.query(cnx, sql, MapListHandler(), request.userId, request.status)
            cnx.close()
        } catch (e: Exception) {
            logger.error("", e)
            resp["message"] = "gRPC服务错误"
        }
        return Reply.newBuilder().setData(Gson().toJson(resp)).build()
    }

    override suspend fun markRead(request: MarkMessageReadRequest): Reply {
        val resp = hashMapOf<String, Any>("message" to "", "content" to "")
        try {
            val qr = QueryRunner()
            val cnx = Postgres.connection
            val sql = """
                update himawari.message
                set doc = jsonb_set(doc::jsonb, '{status}', '"已读"'::jsonb)
                where id = ?
                    and uuid = ?
            """.trimIndent()
            qr.update(cnx, sql, request.id, request.uuid)
            cnx.close()
        } catch (e: Exception) {
            logger.error("", e)
            resp["message"] = "gRPC服务错误"
        }
        return Reply.newBuilder().setData(Gson().toJson(resp)).build()
    }
}
