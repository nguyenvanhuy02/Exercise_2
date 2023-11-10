package com.example.be.service.impl;

import com.example.be.dto.user.IUserListDto;
import com.example.be.model.user.User;
import com.example.be.repository.user.IUserRepository;
import com.example.be.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService {

    @Autowired
    private IUserRepository userRepository;

    @Override
    public Page<IUserListDto> findAllUser(Pageable pageable) {
        return userRepository.findAllUser(pageable);
    }

    @Override
    public void createUser(User user) {
        userRepository.save(user);
    }

    @Override
    public Boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User getUserById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

}
