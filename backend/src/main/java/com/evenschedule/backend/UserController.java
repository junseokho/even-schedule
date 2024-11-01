package com.evenschedule.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000") // React 앱의 주소
@RestController
public class UserController {

    @GetMapping("/api/users") // 엔드포인트 정의
    public String getUsers() {
        return "Hello, Users!";
    }
}
