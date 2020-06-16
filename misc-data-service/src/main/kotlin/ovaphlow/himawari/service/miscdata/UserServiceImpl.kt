package ovaphlow.himawari.service.miscdata

import com.google.gson.Gson
import org.apache.commons.dbutils.QueryRunner
import org.apache.commons.dbutils.handlers.MapHandler
import org.apache.commons.dbutils.handlers.MapListHandler
import org.slf4j.Logger
import org.slf4j.LoggerFactory

class UserServiceImpl: UserGrpcKt.UserCoroutineImplBase() {
    val logger: Logger = LoggerFactory.getLogger(UserServiceImpl::class.java)

    override suspend fun filter(request: FilterUserRequest): Reply {
        val resp = hashMapOf<String, Any>("message" to "", "content" to "")
        try {
            val qr = QueryRunner()
            val cnx = Postgres.connection
            val sql = """
                select u.id, u.uuid, u.dept_id, u.username, u.auth_super, s.name as dept
                from himawari.user as u left join himawari.setting as s on s.id = u.dept_id
                where position(? in u.username) > 0
                    or position(? in s.name) > 0
                order by u.id desc
                limit 200
            """.trimIndent()
            resp["content"] = qr.query(cnx, sql, MapListHandler(), request.filter, request.filter)
        } catch (e: Exception) {
            logger.error("{}", e)
            resp["message"] = "gRPC服务错误"
        }
        return Reply.newBuilder().setData(Gson().toJson(resp)).build()
    }

    override suspend fun get(request: GetUserRequest): Reply {
        val resp = hashMapOf<String, Any>("message" to "", "content" to "")
        try {
            val qr = QueryRunner()
            val cnx = Postgres.connection
            val sql = """
                select u.id, u.uuid, u.dept_id, u.username, u.auth_super, c.name as dept
                from himawari.user as u left join himawari.setting as c on c.id = u.dept_id
                where u.id = ? and u.uuid = ?
                limit 1
            """.trimIndent()
            resp["content"] = qr.query(cnx, sql, MapHandler(), request.id, request.uuid)
        } catch (e: Exception) {
            logger.error("{}", e)
            resp["message"] = "gRPC服务错误"
        }
        return Reply.newBuilder().setData(Gson().toJson(resp)).build()
    }

    override suspend fun update(request: UpdateUserRequest): Reply {
        val resp = hashMapOf<String, Any>("message" to "", "content" to "")
        try {
            val qr = QueryRunner()
            val cnx = Postgres.connection
            val sql = """
                update himawari.user
                set uuid = ?, username = ?, dept_id = ?, auth_super = ?
                where id = ?
            """.trimIndent()
            qr.update(cnx, sql, request.uuid, request.username, request.deptId, request.authSuper)
        } catch (e: Exception) {
            logger.error("{}", e)
            resp["message"] = "gRPC服务错误"
        }
        return Reply.newBuilder().setData(Gson().toJson(resp)).build()
    }

    override suspend fun remove(request: RemoveUserRequest): Reply {
        val resp = hashMapOf<String, Any>("message" to "", "content" to "")
        try {
            val qr = QueryRunner()
            val cnx = Postgres.connection
            val sql = """
                delete from himawari.user where id = ? and uuid = ?
            """.trimIndent()
            qr.update(cnx, sql, request.id, request.uuid)
        } catch (e: Exception) {
            logger.error("{}", e)
            resp["message"] = "gRPC服务错误"
        }
        return Reply.newBuilder().setData(Gson().toJson(resp)).build()
    }
}