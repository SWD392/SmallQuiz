package swd392.project.smallquiz.helper;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;
import swd392.project.smallquiz.model.entiity.Answer;
import swd392.project.smallquiz.model.entiity.Question;
import swd392.project.smallquiz.repository.QuestionRepository;
import swd392.project.smallquiz.response.ExcelConvertResponse;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ExcelHelper {

    private static QuestionRepository questionRepository;
    private static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    static String[] HEADERs = {"Id", "Created_date", "Content", "Answer_id", "Content", "Status", "Question_id"};
    static String SHEET = "QuizManagement";

    public static boolean hasExcelFormat(MultipartFile multipartFile) {
        return TYPE.equals(multipartFile.getContentType());
    }

    public static ExcelConvertResponse excelToQuizs(InputStream is) {
        try {
            Workbook workbook = new XSSFWorkbook(is);

            Sheet sheet = workbook.getSheet(SHEET);
            Iterator<Row> rows = sheet.iterator();

            ExcelConvertResponse excelConvertResponse = new ExcelConvertResponse();

            int rowNumber = 0;

            while (rows.hasNext()) {
                Row currentRow = rows.next();

                if (rowNumber == 0) {
                    rowNumber++;
                    continue;
                }

                Iterator<Cell> cellInRow = currentRow.iterator();

                List<Question> questions = new ArrayList<>();
                List<Answer> answers = new ArrayList<>();

                Question question = new Question();
                Answer answer = new Answer();

                int cellId = 0;
                while (cellInRow.hasNext()) {
                    Cell currentCell = cellInRow.next();

                    switch (cellId) {
                        case 0:
                            question.setId((long) currentCell.getNumericCellValue());
                            break;
                        case 2:
                            question.setCreatedDate(currentCell.getDateCellValue().toInstant());
                            break;
                        case 3:
                            question.setContent(currentCell.getStringCellValue());
                            break;
                        case 4:
                            answer.setId((long) currentCell.getNumericCellValue());
                            break;
                        case 5:
                            answer.setContent(currentCell.getStringCellValue());
                            break;
                        case 6:
                            answer.setStatus(currentCell.getBooleanCellValue());
                            break;
                        case 7:
                        default:
                            Question questionByAnswer = questionRepository.findById((long) currentCell.getNumericCellValue())
                                    .orElseGet(Question::new);
                            answer.setQuestion(questionByAnswer);
                            break;
                    }
                    cellId++;
                    questions.add(question);
                    answers.add(answer);
                }
                excelConvertResponse.setAnswers(answers);
                excelConvertResponse.setQuestions(questions);

            }
            workbook.close();
            return excelConvertResponse;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
