package ovaphlow.himawari.service.misc

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import java.sql.Connection
import java.sql.SQLException

object Postgres {
    private var ds: HikariDataSource? = null

    @get:Throws(SQLException::class)
    val connection: Connection
        get() = ds!!.connection

    init {
        val config = HikariConfig()
        config.jdbcUrl = "jdbc:postgresql://192.168.1.214:5432/ovaphlow"
        config.username = "ovaphlow"
        config.password = ""
        config.maximumPoolSize = 8
        config.addDataSourceProperty("cachePrepStmts", "true")
        config.addDataSourceProperty("prepStmtCacheSize", "250")
        config.addDataSourceProperty("prepStmtCacheSqlLimit", "2048")
        ds = HikariDataSource(config)
    }
}
