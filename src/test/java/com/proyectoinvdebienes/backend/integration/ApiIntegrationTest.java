package com.proyectoinvdebienes.backend.integration;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ApiIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void healthEndpointShouldBePublic() throws Exception {
        mockMvc.perform(get("/"))
                .andExpect(status().isOk());
    }

    @Test
    void inventoryEndpointShouldRequireAuthentication() throws Exception {
        mockMvc.perform(get("/api/inventory/assets"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void createInvoiceShouldBeForbiddenWithoutPurchasesRole() throws Exception {
        String payload = """
                {
                  \"invoiceNumber\": \"FAC-001\",
                  \"invoiceDate\": \"2026-01-10\",
                  \"totalAmount\": 1500.50,
                  \"supplierId\": 1,
                  \"budgetLineId\": 1,
                  \"notes\": \"Compra inicial\"
                }
                """;

        mockMvc.perform(post("/api/acquisitions/invoices")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isUnauthorized());
    }
}
