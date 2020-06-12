package ovaphlow.himawari.service.setting

import io.grpc.Server
import io.grpc.ServerBuilder

class Application constructor(
        private val port: Int
) {
    val server: Server = ServerBuilder
            .forPort(port)
            .addService(SettingService())
            .build()

    fun start() {
        server.start()
        println("Server started, listening on $port")
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

//    private class SettingService : SettingServiceGrpcKt.SettingServiceCoroutineImplBase() {
//        override suspend fun list(request: SettingProto.ListRequest) = SettingProto.Reply
//                .newBuilder()
//                .setData("Hello ${request.cat}")
//                .build()
//    }
    private class SettingService: SettingServiceGrpcKt.SettingServiceCoroutineImplBase() {
        override suspend fun list(request: SettingProto.ListRequest): SettingProto.Reply {
            return SettingProto.Reply.newBuilder().setData("{message:\"123\"}").build()
        }
    }
}

fun main() {
    val port = 50051
    val server = Application(port)
    server.start()
    server.blockUntilShutdown()
}