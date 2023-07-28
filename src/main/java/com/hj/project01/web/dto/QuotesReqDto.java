package com.hj.project01.web.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class QuotesReqDto {

    @NotBlank
    private String category;
    @NotBlank
    private String author;
    @NotBlank
    private String contentKo;
    @NotBlank
    private String contentEn;
    @NotBlank
    private int lengthKo;
    @NotBlank
    private int lengthEn;
}
