package ovaphlow.himawari.service.misc

import com.google.gson.Gson
import org.apache.commons.dbutils.QueryRunner
import org.apache.commons.dbutils.handlers.MapHandler
import org.slf4j.Logger
import org.slf4j.LoggerFactory

class CurrentUserServiceImpl: CurrentUserGrpcKt.CurrentUserCoroutineImplBase() {
    val logger: Logger = LoggerFactory.getLogger(CurrentUserServiceImpl::class.java)

    override suspend fun signUp(request: SignUpRequest): Reply {
        val resp = hashMapOf<String, Any>("message" to "", "content" to "")
        try {
            val cnx = Postgres.connection
            var sql = """
               select count(*) as qty from himawari.user where username = ?
            """.trimIndent()
            val qr = QueryRunner()
            val result = qr.query(cnx, sql, MapHandler(), request.username)
            if ("0" === result["qty"]) {
                sql = """
                   insert into
                   himawari.user (uuid, username, password, salt)
                   values (?, ?, ?, ?)
                   returning id
                """.trimIndent()
                resp["content"] = qr.query(cnx, sql, MapHandler(),
                        request.uuid, request.username, request.password, request.salt)
            } else {
                resp["message"] = "用户不存在或用户名/密码输入错误"
            }
            cnx.close()
        } catch (e: Exception) {
            logger.error("{}", e)
            resp["message"] = "gRPC服务错误"
        }
        return Reply.newBuilder().setData(Gson().toJson(resp)).build()
    }

    override suspend fun signIn(request: SignInRequest): Reply {
        val resp = hashMapOf<String, Any>("message" to "", "content" to "")
        try {
            val qr = QueryRunner()
            val cnx = Postgres.connection
            val sql = """
                select *,
                    (select name from himawari.setting where id = u.dept_id) as dept
                from himawari.user as u
                where username = ?
            """.trimIndent()
            resp["content"] = qr.query(cnx, sql, MapHandler(), request.username)
            cnx.close()
        } catch (e: Exception) {
            logger.error("{}", e)
            resp["message"] = "gRPC服务错误"
        }
        return Reply.newBuilder().setData(Gson().toJson(resp)).build()
    }

    override suspend fun getSalt(request: GetSaltRequest): Reply {
        val resp = hashMapOf<String, Any>("message" to "", "content" to "")
        try {
            val qr = QueryRunner()
            val cnx = Postgres.connection
            val sql = """
                select password, salt from himawari.user where id = ? and uuid = ?
            """.trimIndent()
            resp["content"] = qr.query(cnx, sql, MapHandler(), request.id, request.uuid)
            cnx.close()
        } catch (e: Exception) {
            logger.error("{}", e)
            resp["message"] = "gRPC服务错误"
        }
        return Reply.newBuilder().setData(Gson().toJson(resp)).build()
    }

    override suspend fun updatePassword(request: UpdatePasswordRequest): Reply {
        val resp = hashMapOf<String, Any>("message" to "", "content" to "")
        try {
            val qr = QueryRunner()
            val cnx = Postgres.connection
            val sql = """
               update himawari.user set password = ? where id = ? and uuid = ?
            """.trimIndent()
            qr.update(cnx, sql, request.id, request.uuid)
            cnx.close()
        } catch (e: Exception) {
            logger.error("{}", e)
            resp["message"] = "gRPC服务错误"
        }
        return Reply.newBuilder().setData(Gson().toJson(resp)).build()
    }
}
