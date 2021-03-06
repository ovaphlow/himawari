package ovaphlow.himawari.service.biz;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import java.sql.Connection;
import java.sql.SQLException;

public class DBUtil {
    private static HikariDataSource ds;

    static {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl("jdbc:postgresql://" + Global.getDbUrl());
        config.setUsername(Global.getDbUsername());
        config.setPassword(Global.getDbPassword());
//        空闲时维持的连接数（最小连接数），默认与最大连接数同值。
//        config.setMinimumIdle(0);
        config.setMaximumPoolSize(Global.getDbPoolSize());
        config.addDataSourceProperty("cachePrepStmts", "true");
        config.addDataSourceProperty("prepStmtCacheSize", "250");
        config.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");

        ds = new HikariDataSource(config);
    }

    public static Connection getConnection() throws SQLException {
        return ds.getConnection();
    }
}
