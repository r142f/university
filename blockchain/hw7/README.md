## How to run
- Clone repository. 
- In the repository:
    ```bash
    go run ./main --file <filename> --numbilets <num> --parameter <num>
    ```
  -  `--file <filename>` — file name with full name of students
  -  `--numbilets <num>` — number of questions
  -  `--parameter <num>` — parameter that changes the distribution

## Example of logs output
```bash
go run ./main.go --file input.txt --numbilets 3 --parameter 0
```
```bash
Иванов Иван Иванович: 3
Ярцев Ярослав Ярославович: 1
Петров Петр Петрович: 2
```
```bash
go run ./main.go --file input.txt --numbilets 3 --parameter 5
```
```bash
Иванов Иван Иванович: 1
Ярцев Ярослав Ярославович: 2
Петров Петр Петрович: 3
```