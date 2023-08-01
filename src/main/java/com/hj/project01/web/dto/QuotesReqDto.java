package com.hj.project01.web.dto;

import lombok.Data;

import javax.validation.constraints.Min;
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

    @Min(1)
    private int lengthKo;
    @Min(1)
    private int lengthEn;
}
