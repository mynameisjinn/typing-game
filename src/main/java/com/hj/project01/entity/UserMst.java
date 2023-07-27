package com.hj.project01.entity;


import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserMst {

    @ApiModelProperty(hidden = true)
    private int userId;

    @ApiModelProperty(name = "username", value = "이메일", example = "abc@gmail.com", required = true)
    private String username;

    @ApiModelProperty(name = "password", value = "비밀번호", example = "hikakao@1", required = true)
    private String password;

    @ApiModelProperty(name = "name", value = "성명", example = "김카카오", required = true)
    private String name;


    @ApiModelProperty(name = "provider", value = "OAuth데이터출처", example = "Kakao", required = false)
    private String provider;


    @ApiModelProperty(hidden = true)
    private LocalDateTime createDate;
    @ApiModelProperty(hidden = true)
    private LocalDateTime updateDate;

    @ApiModelProperty(hidden = true)
    private List<RoleDtl> roleDtl;
}
