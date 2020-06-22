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
                    values (?, ?, ?::json)
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

    override suspend fun listUnread(request: ListUnreadMessageRequest): Reply {
        val resp = hashMapOf<String, Any>("message" to "", "content" to "")
        try {
            val qr = QueryRunner()
            val cnx = Postgres.connection
            val sql = """
                select * from himawari.message where user_id = ?
            """.trimIndent()
            resp["content"] = qr.query(cnx, sql, MapListHandler(), request.userId)
            cnx.close()
        } catch (e: Exception) {
            logger.error("", e)
            resp["message"] = "gRPC服务错误"
        }
        return Reply.newBuilder().setData(Gson().toJson(resp)).build()
    }
}
