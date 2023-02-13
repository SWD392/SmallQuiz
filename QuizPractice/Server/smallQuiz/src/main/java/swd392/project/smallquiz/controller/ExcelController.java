package swd392.project.smallquiz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import swd392.project.smallquiz.helper.ExcelHelper;
import swd392.project.smallquiz.response.MessageResponse;
import swd392.project.smallquiz.services.ExcelService;

@Controller
@RequestMapping("api/excel")
public class ExcelController {

    @Autowired
    private ExcelService excelService;

    @PostMapping("/upload")
    public ResponseEntity<MessageResponse> uploadFile(@RequestParam("file")MultipartFile file) {
        String message;
        if(ExcelHelper.hasExcelFormat(file)) {
            try {
                excelService.save(file);
                message = "Uploaded the file successfully: " + file.getOriginalFilename();

                return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
            } catch (Exception e) {
                message = "Could not upload the file: " + file.getOriginalFilename() + "!";
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
            }
        }
        message = "Please upload an excel file!";
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse(message));
    }
}
