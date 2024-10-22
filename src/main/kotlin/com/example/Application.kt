package com.example

import com.example.data.dataInjectionMainModule
import com.example.plugins.*
import io.ktor.server.application.*
import io.ktor.server.netty.*
import org.koin.ktor.plugin.Koin

fun main(args: Array<String>) {
    EngineMain.main(args)

}

@Suppress("unused")
fun Application.module() {
    install(Koin){
        modules(dataInjectionMainModule)
    }
    configureSockets()
    configureRouting()
    configureSerialization()
    configureMonitoring()
    configureSecurity()
}
