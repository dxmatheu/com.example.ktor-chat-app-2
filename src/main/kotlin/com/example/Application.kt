package com.example

import com.example.data.dataInjectionMainModule
import com.example.plugins.*
import io.ktor.server.application.*
import io.ktor.server.plugins.cors.*
import io.ktor.server.netty.*
import io.ktor.http.*
import org.koin.ktor.plugin.Koin


fun main(args: Array<String>) {
    EngineMain.main(args)

}

@Suppress("unused")
fun Application.module() {
    install(Koin){
        modules(dataInjectionMainModule)
    }
    install(CORS) {
        allowMethod(HttpMethod.Get)    // Allow GET requests
        allowMethod(HttpMethod.Post)   // Allow POST requests if needed
        allowHeader(HttpHeaders.ContentType) // Allow Content-Type header

        allowCredentials = true  // Allow credentials if needed
        allowNonSimpleContentTypes = true
        anyHost() // Allow all hosts during development (replace with specific hosts for production)
    }
    configureSockets()
    configureRouting()
    configureSerialization()
    configureMonitoring()
    configureSecurity()
}
