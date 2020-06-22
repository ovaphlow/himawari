package ovaphlow.himawari.service.misc

import io.grpc.Server
import io.grpc.ServerBuilder
import org.slf4j.Logger
import org.slf4j.LoggerFactory

class Application constructor(private val port: Int) {
    private val logger: Logger = LoggerFactory.getLogger(Application::class.java)

    val server: Server = ServerBuilder
            .forPort(port)
            .addService(SettingServiceImpl())
            .addService(UserServiceImpl())
            .addService(CurrentUserServiceImpl())
            .addService(MessageServiceImpl())
            .build()

    fun start() {
        server.start()
        logger.info("MISC-SERVICE 启动于端口 $port")
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
}

fun main() {
    val port = 8912
    val server = Application(port)
    server.start()
    server.blockUntilShutdown()
}
