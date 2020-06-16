package ovaphlow.himawari.service.biz;

public class Global {
    private static int PORT = 8911;
    private static String DB_URL = "192.168.1.223:5432/ovaphlow";
    private static String DB_USERNAME = "ovaphlow";
    private static String DB_PASSWORD = "";
//    private static String DB_URL = "127.0.0.1:5432/ovaphlow";
//    private static String DB_USERNAME = "ovaphlow";
//    private static String DB_PASSWORD = "";
    private static int DB_POOL_SIZE = 8;

    public static int getPORT() {
        return PORT;
    }

    public static void setPORT(int port) {
        PORT = port;
    }

    public static String getDbUrl() {
        return DB_URL;
    }

    public static void setDbUrl(String dbUrl) {
        DB_URL = dbUrl;
    }

    public static String getDbUsername() {
        return DB_USERNAME;
    }

    public static void setDbUsername(String dbUsername) {
        DB_USERNAME = dbUsername;
    }

    public static String getDbPassword() {
        return DB_PASSWORD;
    }

    public static void setDbPassword(String dbPassword) {
        DB_PASSWORD = dbPassword;
    }

    public static int getDbPoolSize() {
        return DB_POOL_SIZE;
    }

    public static void setDbPoolSize(int dbPoolSize) {
        DB_POOL_SIZE = dbPoolSize;
    }
}
