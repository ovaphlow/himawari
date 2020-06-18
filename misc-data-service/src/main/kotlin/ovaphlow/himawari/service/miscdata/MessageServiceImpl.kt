package ovaphlow.himawari.service.miscdata

import com.google.gson.Gson
import org.apache.commons.dbutils.QueryRunner
import org.apache.commons.dbutils.handlers.MapHandler
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
        } catch (e: Exception) {
            logger.error("", e)
            resp["message"] = "gRPC服务错误"
        }
        return Reply.newBuilder().setData(Gson().toJson(resp)).build()
    }
}