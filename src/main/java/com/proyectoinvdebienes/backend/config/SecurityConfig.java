package com.proyectoinvdebienes.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/").permitAll()
                        .requestMatchers("/api/reports/**").hasAnyRole("ADMINISTRADOR", "FINANZAS")
                        .requestMatchers("/api/acquisitions/**").hasAnyRole("ADMINISTRADOR", "COMPRAS")
                        .requestMatchers("/api/inventory/**").hasAnyRole("ADMINISTRADOR", "INVENTARIO")
                        .requestMatchers("/api/assignments/**").hasAnyRole("ADMINISTRADOR", "INVENTARIO")
                        .requestMatchers("/api/disposals/**").hasAnyRole("ADMINISTRADOR", "INVENTARIO")
                        .anyRequest().authenticated())
                .httpBasic(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder encoder) {
        return new InMemoryUserDetailsManager(
                User.withUsername("admin").password(encoder.encode("admin123")).roles("ADMINISTRADOR").build(),
                User.withUsername("compras").password(encoder.encode("compras123")).roles("COMPRAS").build(),
                User.withUsername("inventario").password(encoder.encode("inventario123")).roles("INVENTARIO").build(),
                User.withUsername("finanzas").password(encoder.encode("finanzas123")).roles("FINANZAS").build());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
