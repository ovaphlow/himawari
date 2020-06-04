package ovaphlow.himawari.service.data;

import io.grpc.Server;
import io.grpc.ServerBuilder;
import org.apache.commons.cli.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

public class Application {
    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    private Server server;

    private void start() throws IOException {
        server = ServerBuilder.forPort(Global.getPORT())
                .maxInboundMessageSize(1024 * 1024 * 256)
                .addService(new ArchiveServiceImpl())
                .addService(new PictureServiceImpl())
                .addService(new ArchiveIsolatedServiceImpl())
                .addService(new UserServiceImpl())
                .addService(new SettingServiceImpl())
                .build()
                .start();
        logger.info("服务启动于端口 " + Global.getPORT());
        Runtime.getRuntime().addShutdownHook(new Thread() {
            @Override
            public void run() {
                System.err.println("*** shutting down gRPC server since JVM is shutting down");
                try {
                    Application.this.stop();
                } catch (InterruptedException e) {
                    e.printStackTrace(System.err);
                }
                System.err.println("*** server shut down");
            }
        });
    }

    private void stop() throws InterruptedException {
        if (server != null) {
            server.shutdown().awaitTermination(30, TimeUnit.SECONDS);
        }
    }

    private void blockUntilShutdown() throws InterruptedException {
        if (server != null) {
            server.awaitTermination();
        }
    }

    public static void main(String[] args) throws IOException, InterruptedException {
        final Options options = new Options();
        options.addOption(new Option("h", "help", false, "HELP"));
        options.addOption(new Option("p","port", true, "服务使用的端口"));
        options.addOption(new Option("L", "db_url", true, "数据库连接地址(IP:PORT/NAME)"));
        options.addOption(new Option("U", "db_username", true, "数据库用户"));
        options.addOption(new Option("P", "db_password", true, "数据库密码"));
        options.addOption(new Option("S", "db_pool_size", true, "数据库连接池容量"));
        CommandLineParser parser = new DefaultParser();
        try {
            CommandLine cmd = parser.parse(options, args);
            if (cmd.hasOption("help")) {
                HelpFormatter formatter = new HelpFormatter();
                formatter.printHelp("ls", options);
                System.exit(0);
            }
            if (cmd.hasOption("port")) {
                Global.setPORT(Integer.parseInt(cmd.getOptionValue("port")));
            }
            if (cmd.hasOption("db_url")) {
                Global.setDbUrl(cmd.getOptionValue("db_url"));
            }
            if (cmd.hasOption("db_username")) {
                Global.setDbUsername(cmd.getOptionValue("db_username"));
            }
            if (cmd.hasOption("db_password")) {
                Global.setDbPassword(cmd.getOptionValue("db_password"));
            }
            if (cmd.hasOption("db_pool_size")) {
                Global.setDbPoolSize(Integer.parseInt(cmd.getOptionValue("db_pool_size")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        final Application server = new Application();
        server.start();
        server.blockUntilShutdown();
    }
}