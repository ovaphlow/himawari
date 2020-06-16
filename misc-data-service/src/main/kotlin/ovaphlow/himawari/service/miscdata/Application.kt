package ovaphlow.himawari.service.miscdata

import com.google.gson.Gson
import io.grpc.Server
import io.grpc.ServerBuilder
import org.apache.commons.dbutils.QueryRunner
import org.apache.commons.dbutils.handlers.MapHandler
import org.apache.commons.dbutils.handlers.MapListHandler
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.sql.Connection

class Application constructor(private val port: Int) {
    private val logger: Logger = LoggerFactory.getLogger(Application::class.java)

    val server: Server = ServerBuilder
            .forPort(port)
            .addService(SettingService())
            .build()

    fun start() {
        server.start()
        logger.info("MISC-DATA-SERVICE 启动于端口 $port")
        Runtime.getRuntime().addShutdownHook(
                Thread {
                    println("*** shutting down gRPC server since JVM is shutting down")
                    this@Application.stop()
                    println("*** server shut down")
                }
        )
    }

    private fun stop() {
        server.shutdown()
    }

    fun blockUntilShutdown() {
        server.awaitTermination()
    }

    private class SettingService : SettingServiceGrpcKt.SettingServiceCoroutineImplBase() {
        val logger: Logger = LoggerFactory.getLogger(SettingService::class.java)

        override suspend fun list(request: ListSettingRequest): Reply {
            val resp: HashMap<String, Any> = hashMapOf("message" to "", "content" to "")
            try {
                val cnx: Connection = Postgres.connection
                val sql = """
                    select * from himawari.setting where master_id = 0 and category = ?
                """.trimIndent()
                val qr = QueryRunner()
                resp["content"] = qr.query(cnx, sql, MapListHandler(), request.cat)
                cnx.close()
            } catch (e: Exception) {
                logger.error("", e)
                resp["message"] = "gRPC服务错误"
            }
            return Reply.newBuilder().setData(Gson().toJson(resp)).build()
        }

        override suspend fun save(request: SaveSettingRequest): Reply {
            val resp = hashMapOf<String, Any>("message" to "", "content" to "")
            try {
                val cnx = Postgres.connection
                val sql = """
                    insert into
                        himawari.setting (uuid, master_id, category, name, value, doc)
                        values (?, ?, ?, ?, ?, ?::json)
                    returning id
                """.trimIndent()
                val qr = QueryRunner()
                resp["content"] = qr.query(cnx, sql, MapHandler(),
                        request.uuid, request.masterId, request.category, request.name, request.value, request.doc)
                cnx.close()
            } catch (e: Exception) {
                logger.error("", e)
                resp["message"] = "gRPC服务错误"
            }
            return Reply.newBuilder().setData(Gson().toJson(resp)).build()
        }

        override suspend fun get(request: GetSettingRequest): Reply {
            val resp = hashMapOf<String, Any>("message" to "", "content" to "")
            try {
                val cnx = Postgres.connection
                val sql = """
                   select * from himawari.setting where id = ? and uuid = ? limit 1
                """.trimIndent()
                val qr = QueryRunner()
                resp["content"] = qr.query(cnx, sql, MapHandler(),
                        request.id, request.uuid)
                cnx.close()
            } catch (e: Exception) {
                logger.error("", e)
                resp["message"] = "gRPC服务错误"
            }
            return Reply.newBuilder().setData(Gson().toJson(resp)).build()
        }

        override suspend fun update(request: UpdateSettingRequest): Reply {
            val resp = hashMapOf<String, Any>("message" to "", "content" to "")
            try {
                val cnx = Postgres.connection
                val sql = """
                   update himawari.setting
                   set uuid = ?, master_id = ?, category = ?, name = ?, value = ?, doc = ?::json
                   where id = ?
                """.trimIndent()
                val qr = QueryRunner()
                qr.update(cnx, sql, request.uuid, request.masterId, request.category, request.name,
                            request.value, request.doc, request.id)
                cnx.close()
            } catch (e: Exception) {
                logger.error("", e)
                resp["message"] = "gRPC服务错误"
            }
            return Reply.newBuilder().setData(Gson().toJson(resp)).build()
        }

        override suspend fun remove(request: RemoveSettingRequest): Reply {
            val resp = hashMapOf<String, Any>("message" to "", "content" to "")
            try {
                val cnx = Postgres.connection
                val sql = """
                   delete from himawari.setting where id = ? and uuid = ?
                """.trimIndent()
                val qr = QueryRunner()
                qr.update(cnx, sql, request.id, request.uuid)
                cnx.close()
            } catch (e: Exception) {
                logger.error("", e)
                resp["message"] = "gRPC服务错误"
            }
            return Reply.newBuilder().setData(Gson().toJson(resp)).build()
        }
    }
}

fun main() {
    val port = 8912
    val server = Application(port)
    server.start()
    server.blockUntilShutdown()
}
