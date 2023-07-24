package com.hj.project01.service;

import com.hj.project01.repository.ResultRepository;
import com.hj.project01.web.dto.ResultDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class ResultService {
    @Autowired
    private ResultRepository resultRepository;

    public int addResult(ResultDto resultDto) {
        return resultRepository.saveResult(resultDto) > 0 ? resultDto.getResultId(): 0;
    }
}
