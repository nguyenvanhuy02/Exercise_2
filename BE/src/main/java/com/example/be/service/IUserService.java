package com.example.be.service;


import com.example.be.dto.user.IUserListDto;
import com.example.be.model.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IUserService {
    Page<IUserListDto> findAllUser(Pageable pageable);

    void createUser(User user);

    Boolean existsByEmail ( String email);

    User getUserById(Integer id);

}
