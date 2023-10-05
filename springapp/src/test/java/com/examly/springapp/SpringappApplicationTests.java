package com.examly.springapp;

import static org.junit.Assert.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.io.File;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = SpringappApplication.class)
@AutoConfigureMockMvc
class SpringappApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Test
	public void testGetAppointmentAll() throws Exception {

		mockMvc.perform(get("/admin/appointment"))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andDo(print())
				.andExpect(content().contentType("application/json"))
				.andExpect(jsonPath("$").isArray())
				.andReturn();
	}

	@Test
	public void testGetAppointmentById() throws Exception {
		Long Id=1L;

		mockMvc.perform(get("/admin/appointment").param("id", "1"))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andDo(print())
				.andExpect(content().contentType("application/json"))
				.andExpect(jsonPath("$").isArray())
				.andReturn();
	}

	@Test
	public void testGetServiceAll() throws Exception {

		mockMvc.perform(get("/admin/service-center"))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andDo(print())
				.andExpect(content().contentType("application/json"))
				.andExpect(jsonPath("$").isArray())
				.andReturn();
	}

	@Test
	public void testGetServiceById() throws Exception {
		Long Id=1L;

		mockMvc.perform(get("/admin/service-center").param("id", "1"))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andDo(print())
				.andExpect(content().contentType("application/json"))
				.andExpect(jsonPath("$").isArray())
				.andReturn();
	}

	@Test
	public void test_case1() {
		String directoryPath = "src/main/java/com/examly/springapp/controller";
		File directory = new File(directoryPath);
		assertTrue(directory.exists() && directory.isDirectory());;
	}


	@Test
	public void test_case2() {
		String filePath = "src/main/java/com/examly/springapp/controller/AppointmentController.java";
		File file = new File(filePath);
		assertTrue(file.exists() && file.isFile());;

	}

	@Test
	public void test_case3() {
		String directoryPath = "src/main/java/com/examly/springapp/model";
		File directory = new File(directoryPath);
		assertTrue(directory.exists() && directory.isDirectory());;
	}


	@Test
	public void test_case4() {
		String filePath = "src/main/java/com/examly/springapp/model/Product.java";
		File file = new File(filePath);
		assertTrue(file.exists() && file.isFile());;

	}

}
