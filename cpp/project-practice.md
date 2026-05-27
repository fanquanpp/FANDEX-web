# C++ 项目实战
 False
 False> @Author: fanquanpp
 False> @Category: C++ Basics
 False> @Description: C++ 项目实战
 False> @Updated: 2026-05-03
 False
 False---
 False
 False## 目录
 False
 False1. [项目一：简易文件管理器](#项目一：简易文件管理器)
 False2. [项目二：简单的 HTTP 服务器](#项目二：简单的-http-服务器)
 False3. [项目三：简单的数据库系统](#项目三：简单的数据库系统)
 False4. [最佳实践](#最佳实践)
 False5. [延伸阅读](#延伸阅读)
 False6. [更新日志](#更新日志)
 False
 False---
 False
 False## 1. 项目一：简易文件管理器
 False
 False### 1.1 项目需求
 False
 False- **功能**: 列出目录、创建文件、删除文件、移动文件、复制文件、创建目录
 False- **技术栈**: C++17 `<filesystem>`, STL, 异常处理
 False- **目标**: 构建一个命令行文件管理器，支持基本的文件操作
 False
 False### 1.2 架构设计
 False
 False#### 1.2.1 模块划分
 False
 False- **FileManager**: 提供底层文件系统操作接口
 False- **CommandParser**: 解析用户输入的命令
 False- **UI**: 提供交互界面
 False- **ErrorHandler**: 处理错误和异常
 False
 False#### 1.2.2 类图
 False
```
 True+----------------+ +----------------+ +----------------+ +----------------+
 True| FileManager |<----| CommandParser |---->| UI |<----| ErrorHandler |
 True+----------------+ +----------------+ +----------------+ +----------------+
 True| - list_dir() | | - parse() | | - display() | | - handle() |
 True| - create_file()| | - get_command()| | - get_input() | | - log_error() |
 True| - delete_file()| +----------------+ +----------------+ +----------------+
 True| - move_file() |
 True| - copy_file() |
 True| - create_dir() |
 True+----------------+
 True```

 False### 1.3 核心实现
 False
 False#### 1.3.1 FileManager 类
 False
```cpp
 True#include <iostream>
 True#include <filesystem>
 True#include <fstream>
 True#include <string>
 True#include <stdexcept>
 True
 Truenamespace fs = std::filesystem;
 True
 Trueclass FileManager {
 Truepublic:
 True // 列出目录内容
 True void list_dir(const std::string& path) {
 True try {
 True if (!fs::exists(path)) {
 True throw std::runtime_error("Path does not exist");
 True }
 True 
 True if (!fs::is_directory(path)) {
 True throw std::runtime_error("Path is not a directory");
 True }
 True 
 True std::cout << "Contents of " << path << ":" << std::endl;
 True for (const auto& entry : fs::directory_iterator(path)) {
 True std::string type = fs::is_directory(entry.path()) ? "[DIR]" : "[FILE]";
 True std::cout << type << " " << entry.path().filename().string() << std::endl;
 True }
 True } catch (const std::exception& e) {
 True throw;
 True }
 True }
 True 
 True // 创建文件
 True void create_file(const std::string& path) {
 True try {
 True if (fs::exists(path)) {
 True throw std::runtime_error("File already exists");
 True }
 True 
 True std::ofstream out(path);
 True if (!out) {
 True throw std::runtime_error("Failed to create file");
 True }
 True out << "Hello, File!" << std::endl;
 True out.close();
 True std::cout << "File created successfully: " << path << std::endl;
 True } catch (const std::exception& e) {
 True throw;
 True }
 True }
 True 
 True // 删除文件
 True void delete_file(const std::string& path) {
 True try {
 True if (!fs::exists(path)) {
 True throw std::runtime_error("File does not exist");
 True }
 True 
 True if (fs::is_directory(path)) {
 True throw std::runtime_error("Path is a directory, use delete_dir instead");
 True }
 True 
 True if (fs::remove(path)) {
 True std::cout << "File deleted successfully: " << path << std::endl;
 True } else {
 True throw std::runtime_error("Failed to delete file");
 True }
 True } catch (const std::exception& e) {
 True throw;
 True }
 True }
 True 
 True // 移动文件
 True void move_file(const std::string& source, const std::string& destination) {
 True try {
 True if (!fs::exists(source)) {
 True throw std::runtime_error("Source file does not exist");
 True }
 True 
 True if (fs::exists(destination)) {
 True throw std::runtime_error("Destination already exists");
 True }
 True 
 True fs::rename(source, destination);
 True std::cout << "File moved successfully: " << source << " -> " << destination << std::endl;
 True } catch (const std::exception& e) {
 True throw;
 True }
 True }
 True 
 True // 复制文件
 True void copy_file(const std::string& source, const std::string& destination) {
 True try {
 True if (!fs::exists(source)) {
 True throw std::runtime_error("Source file does not exist");
 True }
 True 
 True if (fs::exists(destination)) {
 True throw std::runtime_error("Destination already exists");
 True }
 True 
 True fs::copy_file(source, destination);
 True std::cout << "File copied successfully: " << source << " -> " << destination << std::endl;
 True } catch (const std::exception& e) {
 True throw;
 True }
 True }
 True 
 True // 创建目录
 True void create_dir(const std::string& path) {
 True try {
 True if (fs::exists(path)) {
 True throw std::runtime_error("Directory already exists");
 True }
 True 
 True if (fs::create_directories(path)) {
 True std::cout << "Directory created successfully: " << path << std::endl;
 True } else {
 True throw std::runtime_error("Failed to create directory");
 True }
 True } catch (const std::exception& e) {
 True throw;
 True }
 True }
 True};
 True```

 False#### 1.3.2 CommandParser 类
 False
```cpp
 True#include <iostream>
 True#include <string>
 True#include <vector>
 True#include <sstream>
 True
 Trueclass CommandParser {
 Truepublic:
 True enum class CommandType {
 True LIST, CREATE, DELETE, MOVE, COPY, CREATE_DIR, HELP, EXIT, UNKNOWN
 True };
 True 
 True struct Command {
 True CommandType type;
 True std::vector<std::string> arguments;
 True };
 True 
 True Command parse(const std::string& input) {
 True std::vector<std::string> tokens = tokenize(input);
 True if (tokens.empty()) {
 True return {CommandType::UNKNOWN, {}};
 True }
 True 
 True std::string command = tokens[0];
 True std::vector<std::string> args(tokens.begin() + 1, tokens.end());
 True 
 True if (command == "ls" || command == "list") {
 True return {CommandType::LIST, args};
 True } else if (command == "touch" || command == "create") {
 True return {CommandType::CREATE, args};
 True } else if (command == "rm" || command == "delete") {
 True return {CommandType::DELETE, args};
 True } else if (command == "mv" || command == "move") {
 True return {CommandType::MOVE, args};
 True } else if (command == "cp" || command == "copy") {
 True return {CommandType::COPY, args};
 True } else if (command == "mkdir" || command == "create_dir") {
 True return {CommandType::CREATE_DIR, args};
 True } else if (command == "help") {
 True return {CommandType::HELP, args};
 True } else if (command == "exit" || command == "quit") {
 True return {CommandType::EXIT, args};
 True } else {
 True return {CommandType::UNKNOWN, args};
 True }
 True }
 True 
 Trueprivate:
 True std::vector<std::string> tokenize(const std::string& input) {
 True std::vector<std::string> tokens;
 True std::istringstream iss(input);
 True std::string token;
 True 
 True while (iss >> token) {
 True tokens.push_back(token);
 True }
 True 
 True return tokens;
 True }
 True};
 True```

 False#### 1.3.3 UI 类
 False
```cpp
 True#include <iostream>
 True#include <string>
 True
 Trueclass UI {
 Truepublic:
 True void display_welcome() {
 True std::cout << "====================================" << std::endl;
 True std::cout << " File Manager v1.0 " << std::endl;
 True std::cout << "====================================" << std::endl;
 True std::cout << "Commands: ls, touch, rm, mv, cp, mkdir, help, exit" << std::endl;
 True std::cout << "====================================" << std::endl;
 True }
 True 
 True std::string get_input() {
 True std::string input;
 True std::cout << "> ";
 True std::getline(std::cin, input);
 True return input;
 True }
 True 
 True void display_help() {
 True std::cout << "Help:" << std::endl;
 True std::cout << " ls [path] - List directory contents" << std::endl;
 True std::cout << " touch <file> - Create a new file" << std::endl;
 True std::cout << " rm <file> - Delete a file" << std::endl;
 True std::cout << " mv <source> <dest> - Move a file" << std::endl;
 True std::cout << " cp <source> <dest> - Copy a file" << std::endl;
 True std::cout << " mkdir <directory> - Create a directory" << std::endl;
 True std::cout << " help - Show this help" << std::endl;
 True std::cout << " exit - Exit the program" << std::endl;
 True }
 True 
 True void display_error(const std::string& message) {
 True std::cerr << "Error: " << message << std::endl;
 True }
 True 
 True void display_success(const std::string& message) {
 True std::cout << "Success: " << message << std::endl;
 True }
 True};
 True```

 False#### 1.3.4 ErrorHandler 类
 False
```cpp
 True#include <iostream>
 True#include <string>
 True#include <fstream>
 True#include <chrono>
 True
 Trueclass ErrorHandler {
 Truepublic:
 True ErrorHandler(const std::string& log_file = "error.log") : log_file_(log_file) {}
 True 
 True void handle(const std::string& error_message) {
 True std::cerr << "Error: " << error_message << std::endl;
 True log_error(error_message);
 True }
 True 
 Trueprivate:
 True std::string log_file_;
 True 
 True void log_error(const std::string& error_message) {
 True try {
 True std::ofstream log(log_file_, std::ios::app);
 True auto now = std::chrono::system_clock::now();
 True auto now_c = std::chrono::system_clock::to_time_t(now);
 True std::string timestamp = std::ctime(&now_c);
 True timestamp.pop_back(); // Remove newline
 True 
 True log << "[" << timestamp << "] ERROR: " << error_message << std::endl;
 True } catch (...) {
 True // Ignore logging errors
 True }
 True }
 True};
 True```

 False#### 1.3.5 主函数
 False
```cpp
 True#include <iostream>
 True#include "FileManager.h"
 True#include "CommandParser.h"
 True#include "UI.h"
 True#include "ErrorHandler.h"
 True
 Trueint main() {
 True FileManager file_manager;
 True CommandParser parser;
 True UI ui;
 True ErrorHandler error_handler;
 True 
 True ui.display_welcome();
 True 
 True bool running = true;
 True while (running) {
 True std::string input = ui.get_input();
 True auto command = parser.parse(input);
 True 
 True try {
 True switch (command.type) {
 True case CommandParser::CommandType::LIST: {
 True std::string path = command.arguments.empty() ? "." : command.arguments[0];
 True file_manager.list_dir(path);
 True break;
 True }
 True case CommandParser::CommandType::CREATE: {
 True if (command.arguments.empty()) {
 True throw std::runtime_error("Missing file path");
 True }
 True file_manager.create_file(command.arguments[0]);
 True break;
 True }
 True case CommandParser::CommandType::DELETE: {
 True if (command.arguments.empty()) {
 True throw std::runtime_error("Missing file path");
 True }
 True file_manager.delete_file(command.arguments[0]);
 True break;
 True }
 True case CommandParser::CommandType::MOVE: {
 True if (command.arguments.size() < 2) {
 True throw std::runtime_error("Missing source or destination");
 True }
 True file_manager.move_file(command.arguments[0], command.arguments[1]);
 True break;
 True }
 True case CommandParser::CommandType::COPY: {
 True if (command.arguments.size() < 2) {
 True throw std::runtime_error("Missing source or destination");
 True }
 True file_manager.copy_file(command.arguments[0], command.arguments[1]);
 True break;
 True }
 True case CommandParser::CommandType::CREATE_DIR: {
 True if (command.arguments.empty()) {
 True throw std::runtime_error("Missing directory path");
 True }
 True file_manager.create_dir(command.arguments[0]);
 True break;
 True }
 True case CommandParser::CommandType::HELP: {
 True ui.display_help();
 True break;
 True }
 True case CommandParser::CommandType::EXIT: {
 True running = false;
 True std::cout << "Exiting..." << std::endl;
 True break;
 True }
 True case CommandParser::CommandType::UNKNOWN: {
 True ui.display_error("Unknown command. Type 'help' for assistance.");
 True break;
 True }
 True }
 True } catch (const std::exception& e) {
 True error_handler.handle(e.what());
 True }
 True }
 True 
 True return 0;
 True}
 True```

 False### 1.4 构建与部署
 False
 False#### 1.4.1 CMake 配置
 False
```cmake
 Truecmake_minimum_required(VERSION 3.10)
 Trueproject(FileManager)
 True
 Trueset(CMAKE_CXX_STANDARD 17)
 Trueset(CMAKE_CXX_STANDARD_REQUIRED ON)
 True
 True# 添加可执行文件
 Trueadd_executable(FileManager 
 True main.cpp
 True FileManager.cpp
 True CommandParser.cpp
 True UI.cpp
 True ErrorHandler.cpp
 True)
 True
 True# 包含头文件目录
 Truetarget_include_directories(FileManager PRIVATE ${CMAKE_CURRENT_SOURCE_DIR})
 True
 True# 链接必要的库
 Trueif(WIN32)
 True # Windows 特定配置
 True target_link_libraries(FileManager PRIVATE shlwapi)
 Trueendif()
 True```

 False#### 1.4.2 目录结构
 False
```
 TrueFileManager/
 True├── CMakeLists.txt
 True├── main.cpp
 True├── FileManager.h
 True├── FileManager.cpp
 True├── CommandParser.h
 True├── CommandParser.cpp
 True├── UI.h
 True├── UI.cpp
 True├── ErrorHandler.h
 True├── ErrorHandler.cpp
 True└── error.log
 True```

 False### 1.5 测试
 False
 False#### 1.5.1 功能测试
 False
```bash
 True# 编译
 Truemkdir build && cd build
 Truecmake ..
 Truecmake --build .
 True
 True# 运行
 True./FileManager
 True
 True# 测试命令
 True> ls
 True> touch test.txt
 True> ls
 True> cat test.txt
 True> cp test.txt test_copy.txt
 True> ls
 True> mv test_copy.txt test_move.txt
 True> ls
 True> rm test.txt
 True> ls
 True> mkdir test_dir
 True> ls
 True> rm test_move.txt
 True> rmdir test_dir
 True> ls
 True> help
 True> exit
 True```

 False#### 1.5.2 异常测试
 False
 False- 测试不存在的路径
 False- 测试已存在的文件
 False- 测试权限错误
 False- 测试参数不足
 False
 False## 2. 项目二：简单的 HTTP 服务器
 False
 False### 2.1 项目需求
 False
 False- **功能**: 提供静态文件服务，支持基本的 HTTP 请求处理
 False- **技术栈**: C++11, 套接字编程, 线程池
 False- **目标**: 构建一个简单的 HTTP 服务器，能够处理多个并发连接
 False
 False### 2.2 架构设计
 False
 False#### 2.2.1 模块划分
 False
 False- **HTTPServer**: 服务器核心，处理连接和请求
 False- **RequestHandler**: 处理 HTTP 请求
 False- **ThreadPool**: 管理线程池，处理并发连接
 False- **FileServer**: 提供静态文件服务
 False
 False### 2.3 核心实现
 False
 False#### 2.3.1 HTTPServer 类
 False
```cpp
 True#include <iostream>
 True#include <string>
 True#include <thread>
 True#include <vector>
 True#include <cstdlib>
 True#include <cstring>
 True#include <sys/socket.h>
 True#include <netinet/in.h>
 True#include <unistd.h>
 True#include "ThreadPool.h"
 True#include "RequestHandler.h"
 True
 Trueclass HTTPServer {
 Truepublic:
 True HTTPServer(int port, int thread_pool_size = 4) : 
 True port_(port), 
 True thread_pool_(thread_pool_size),
 True server_socket_(-1) {}
 True 
 True ~HTTPServer() {
 True stop();
 True }
 True 
 True void start() {
 True // 创建套接字
 True server_socket_ = socket(AF_INET, SOCK_STREAM, 0);
 True if (server_socket_ < 0) {
 True std::cerr << "Error creating socket" << std::endl;
 True return;
 True }
 True 
 True // 设置套接字选项
 True int opt = 1;
 True setsockopt(server_socket_, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));
 True 
 True // 绑定地址
 True struct sockaddr_in address;
 True address.sin_family = AF_INET;
 True address.sin_addr.s_addr = INADDR_ANY;
 True address.sin_port = htons(port_);
 True 
 True if (bind(server_socket_, (struct sockaddr*)&address, sizeof(address)) < 0) {
 True std::cerr << "Error binding socket" << std::endl;
 True close(server_socket_);
 True server_socket_ = -1;
 True return;
 True }
 True 
 True // 开始监听
 True if (listen(server_socket_, 10) < 0) {
 True std::cerr << "Error listening" << std::endl;
 True close(server_socket_);
 True server_socket_ = -1;
 True return;
 True }
 True 
 True std::cout << "Server started on port " << port_ << std::endl;
 True 
 True // 接受连接
 True while (server_socket_ >= 0) {
 True struct sockaddr_in client_address;
 True socklen_t client_address_len = sizeof(client_address);
 True 
 True int client_socket = accept(server_socket_, (struct sockaddr*)&client_address, &client_address_len);
 True if (client_socket < 0) {
 True std::cerr << "Error accepting connection" << std::endl;
 True continue;
 True }
 True 
 True // 提交任务到线程池
 True thread_pool_.submit([this, client_socket]() {
 True handle_client(client_socket);
 True });
 True }
 True }
 True 
 True void stop() {
 True if (server_socket_ >= 0) {
 True close(server_socket_);
 True server_socket_ = -1;
 True }
 True thread_pool_.shutdown();
 True }
 True 
 Trueprivate:
 True int port_;
 True int server_socket_;
 True ThreadPool thread_pool_;
 True RequestHandler request_handler_;
 True 
 True void handle_client(int client_socket) {
 True request_handler_.handle(client_socket);
 True close(client_socket);
 True }
 True};
 True```

 False#### 2.3.2 ThreadPool 类
 False
```cpp
 True#include <vector>
 True#include <thread>
 True#include <queue>
 True#include <mutex>
 True#include <condition_variable>
 True#include <functional>
 True#include <atomic>
 True
 Trueclass ThreadPool {
 Truepublic:
 True ThreadPool(int size) : stop_(false) {
 True for (int i = 0; i < size; ++i) {
 True threads_.emplace_back([this]() {
 True while (true) {
 True std::function<void()> task;
 True {
 True std::unique_lock<std::mutex> lock(mutex_);
 True condition_.wait(lock, [this]() {
 True return stop_ || !tasks_.empty();
 True });
 True 
 True if (stop_ && tasks_.empty()) {
 True return;
 True }
 True 
 True task = std::move(tasks_.front());
 True tasks_.pop();
 True }
 True 
 True task();
 True }
 True });
 True }
 True }
 True 
 True ~ThreadPool() {
 True shutdown();
 True }
 True 
 True template<typename F>
 True void submit(F&& task) {
 True {
 True std::unique_lock<std::mutex> lock(mutex_);
 True tasks_.emplace(std::forward<F>(task));
 True }
 True condition_.notify_one();
 True }
 True 
 True void shutdown() {
 True {
 True std::unique_lock<std::mutex> lock(mutex_);
 True stop_ = true;
 True }
 True condition_.notify_all();
 True 
 True for (auto& thread : threads_) {
 True if (thread.joinable()) {
 True thread.join();
 True }
 True }
 True }
 True 
 Trueprivate:
 True std::vector<std::thread> threads_;
 True std::queue<std::function<void()>> tasks_;
 True std::mutex mutex_;
 True std::condition_variable condition_;
 True std::atomic<bool> stop_;
 True};
 True```

 False#### 2.3.3 RequestHandler 类
 False
```cpp
 True#include <iostream>
 True#include <string>
 True#include <cstring>
 True#include <fstream>
 True#include <sstream>
 True#include <sys/socket.h>
 True#include <unistd.h>
 True#include "FileServer.h"
 True
 Trueclass RequestHandler {
 Truepublic:
 True void handle(int client_socket) {
 True char buffer[4096] = {0};
 True int bytes_read = read(client_socket, buffer, sizeof(buffer) - 1);
 True 
 True if (bytes_read < 0) {
 True std::cerr << "Error reading from socket" << std::endl;
 True return;
 True }
 True 
 True std::string request(buffer, bytes_read);
 True std::string response = process_request(request);
 True 
 True send(client_socket, response.c_str(), response.size(), 0);
 True }
 True 
 Trueprivate:
 True FileServer file_server_;
 True 
 True std::string process_request(const std::string& request) {
 True std::istringstream iss(request);
 True std::string method, path, version;
 True iss >> method >> path >> version;
 True 
 True if (method != "GET") {
 True return create_response(405, "Method Not Allowed", "<html><body><h1>405 Method Not Allowed</h1></body></html>");
 True }
 True 
 True // 处理根路径
 True if (path == "/") {
 True path = "/index.html";
 True }
 True 
 True // 提供静态文件
 True std::string file_content;
 True int status_code = file_server_.serve_file(path, file_content);
 True 
 True if (status_code == 200) {
 True std::string content_type = get_content_type(path);
 True return create_response(200, "OK", file_content, content_type);
 True } else if (status_code == 404) {
 True return create_response(404, "Not Found", "<html><body><h1>404 Not Found</h1></body></html>");
 True } else {
 True return create_response(500, "Internal Server Error", "<html><body><h1>500 Internal Server Error</h1></body></html>");
 True }
 True }
 True 
 True std::string create_response(int status_code, const std::string& status_message, 
 True const std::string& content, const std::string& content_type = "text/html") {
 True std::ostringstream response;
 True response << "HTTP/1.1 " << status_code << " " << status_message << "\r\n";
 True response << "Content-Type: " << content_type << "\r\n";
 True response << "Content-Length: " << content.size() << "\r\n";
 True response << "Connection: close\r\n";
 True response << "\r\n";
 True response << content;
 True return response.str();
 True }
 True 
 True std::string get_content_type(const std::string& path) {
 True if (path.ends_with(".html")) return "text/html";
 True if (path.ends_with(".css")) return "text/css";
 True if (path.ends_with(".js")) return "application/javascript";
 True if (path.ends_with(".png")) return "image/png";
 True if (path.ends_with(".jpg")) return "image/jpeg";
 True if (path.ends_with(".gif")) return "image/gif";
 True return "text/plain";
 True }
 True};
 True```

 False#### 2.3.4 FileServer 类
 False
```cpp
 True#include <iostream>
 True#include <string>
 True#include <fstream>
 True#include <filesystem>
 True
 Truenamespace fs = std::filesystem;
 True
 Trueclass FileServer {
 Truepublic:
 True FileServer(const std::string& root_dir = "./www") : root_dir_(root_dir) {
 True // 确保根目录存在
 True if (!fs::exists(root_dir_)) {
 True fs::create_directories(root_dir_);
 True }
 True }
 True 
 True int serve_file(const std::string& path, std::string& content) {
 True // 构建完整路径
 True std::string full_path = root_dir_ + path;
 True 
 True // 检查文件是否存在
 True if (!fs::exists(full_path) || !fs::is_regular_file(full_path)) {
 True return 404;
 True }
 True 
 True // 读取文件内容
 True std::ifstream file(full_path, std::ios::binary);
 True if (!file) {
 True return 500;
 True }
 True 
 True std::ostringstream oss;
 True oss << file.rdbuf();
 True content = oss.str();
 True 
 True return 200;
 True }
 True 
 Trueprivate:
 True std::string root_dir_;
 True};
 True```

 False#### 2.3.5 主函数
 False
```cpp
 True#include "HTTPServer.h"
 True
 Trueint main(int argc, char* argv[]) {
 True int port = 8080;
 True if (argc > 1) {
 True port = std::stoi(argv[1]);
 True }
 True 
 True HTTPServer server(port, 4);
 True server.start();
 True 
 True return 0;
 True}
 True```

 False### 2.4 构建与部署
 False
 False#### 2.4.1 CMake 配置
 False
```cmake
 Truecmake_minimum_required(VERSION 3.10)
 Trueproject(HTTPServer)
 True
 Trueset(CMAKE_CXX_STANDARD 11)
 Trueset(CMAKE_CXX_STANDARD_REQUIRED ON)
 True
 True# 添加可执行文件
 Trueadd_executable(HTTPServer 
 True main.cpp
 True HTTPServer.cpp
 True ThreadPool.cpp
 True RequestHandler.cpp
 True FileServer.cpp
 True)
 True
 True# 包含头文件目录
 Truetarget_include_directories(HTTPServer PRIVATE ${CMAKE_CURRENT_SOURCE_DIR})
 True
 True# 链接必要的库
 Trueif(UNIX)
 True target_link_libraries(HTTPServer PRIVATE pthread)
 Trueendif()
 True```

 False#### 2.4.2 目录结构
 False
```
 TrueHTTPServer/
 True├── CMakeLists.txt
 True├── main.cpp
 True├── HTTPServer.h
 True├── HTTPServer.cpp
 True├── ThreadPool.h
 True├── ThreadPool.cpp
 True├── RequestHandler.h
 True├── RequestHandler.cpp
 True├── FileServer.h
 True├── FileServer.cpp
 True└── www/
 True ├── index.html
 True ├── style.css
 True └── script.js
 True```

 False### 2.5 测试
 False
 False#### 2.5.1 功能测试
 False
```bash
 True# 编译
 Truemkdir build && cd build
 Truecmake ..
 Truecmake --build .
 True
 True# 创建 www 目录和测试文件
 Truemkdir -p www
 Trueecho "<html><body><h1>Hello, HTTP Server!</h1></body></html>" > www/index.html
 True
 True# 运行服务器
 True./HTTPServer 8080
 True
 True# 在浏览器中访问
 True# http://localhost:8080
 True
 True# 或使用 curl 测试
 Truecurl http://localhost:8080
 Truecurl http://localhost:8080/nonexistent.html
 True```

 False## 3. 项目三：简单的数据库系统
 False
 False### 3.1 项目需求
 False
 False- **功能**: 支持基本的 CRUD 操作，存储和检索数据
 False- **技术栈**: C++17, STL, 文件 I/O
 False- **目标**: 构建一个简单的键值存储数据库
 False
 False### 3.2 架构设计
 False
 False#### 3.2.1 模块划分
 False
 False- **Database**: 数据库核心，管理数据操作
 False- **Storage**: 处理数据持久化
 False- **Index**: 提供数据索引，加速查询
 False- **API**: 提供用户接口
 False
 False### 3.3 核心实现
 False
 False#### 3.3.1 Database 类
 False
```cpp
 True#include <iostream>
 True#include <string>
 True#include <unordered_map>
 True#include <fstream>
 True#include <sstream>
 True#include <mutex>
 True
 Trueclass Database {
 Truepublic:
 True Database(const std::string& db_file = "database.db") : db_file_(db_file) {
 True load();
 True }
 True 
 True ~Database() {
 True save();
 True }
 True 
 True bool set(const std::string& key, const std::string& value) {
 True std::lock_guard<std::mutex> lock(mutex_);
 True data_[key] = value;
 True return true;
 True }
 True 
 True std::string get(const std::string& key) {
 True std::lock_guard<std::mutex> lock(mutex_);
 True auto it = data_.find(key);
 True if (it != data_.end()) {
 True return it->second;
 True }
 True return "";
 True }
 True 
 True bool del(const std::string& key) {
 True std::lock_guard<std::mutex> lock(mutex_);
 True auto it = data_.find(key);
 True if (it != data_.end()) {
 True data_.erase(it);
 True return true;
 True }
 True return false;
 True }
 True 
 True void save() {
 True std::lock_guard<std::mutex> lock(mutex_);
 True std::ofstream file(db_file_);
 True if (file) {
 True for (const auto& [key, value] : data_) {
 True file << key << " " << value << std::endl;
 True }
 True }
 True }
 True 
 True void load() {
 True std::lock_guard<std::mutex> lock(mutex_);
 True std::ifstream file(db_file_);
 True if (file) {
 True std::string line;
 True while (std::getline(file, line)) {
 True std::istringstream iss(line);
 True std::string key, value;
 True if (iss >> key) {
 True // 读取剩余部分作为值
 True std::getline(iss >> std::ws, value);
 True data_[key] = value;
 True }
 True }
 True }
 True }
 True 
 True size_t size() {
 True std::lock_guard<std::mutex> lock(mutex_);
 True return data_.size();
 True }
 True 
 Trueprivate:
 True std::string db_file_;
 True std::unordered_map<std::string, std::string> data_;
 True std::mutex mutex_;
 True};
 True```

 False#### 3.3.2 主函数
 False
```cpp
 True#include <iostream>
 True#include <string>
 True#include "Database.h"
 True
 Trueint main() {
 True Database db;
 True 
 True std::cout << "Simple Key-Value Database" << std::endl;
 True std::cout << "Commands: set <key> <value>, get <key>, del <key>, exit" << std::endl;
 True 
 True std::string line;
 True while (std::getline(std::cin, line)) {
 True std::istringstream iss(line);
 True std::string command, key, value;
 True iss >> command;
 True 
 True if (command == "set") {
 True iss >> key;
 True std::getline(iss >> std::ws, value);
 True if (db.set(key, value)) {
 True std::cout << "OK" << std::endl;
 True }
 True } else if (command == "get") {
 True iss >> key;
 True std::string result = db.get(key);
 True if (!result.empty()) {
 True std::cout << "Value: " << result << std::endl;
 True } else {
 True std::cout << "Key not found" << std::endl;
 True }
 True } else if (command == "del") {
 True iss >> key;
 True if (db.del(key)) {
 True std::cout << "OK" << std::endl;
 True } else {
 True std::cout << "Key not found" << std::endl;
 True }
 True } else if (command == "exit") {
 True break;
 True } else {
 True std::cout << "Unknown command" << std::endl;
 True }
 True }
 True 
 True return 0;
 True}
 True```

 False### 3.4 构建与部署
 False
 False#### 3.4.1 CMake 配置
 False
```cmake
 Truecmake_minimum_required(VERSION 3.10)
 Trueproject(SimpleDatabase)
 True
 Trueset(CMAKE_CXX_STANDARD 17)
 Trueset(CMAKE_CXX_STANDARD_REQUIRED ON)
 True
 True# 添加可执行文件
 Trueadd_executable(SimpleDatabase 
 True main.cpp
 True Database.cpp
 True)
 True
 True# 包含头文件目录
 Truetarget_include_directories(SimpleDatabase PRIVATE ${CMAKE_CURRENT_SOURCE_DIR})
 True```

 False### 3.5 测试
 False
 False#### 3.5.1 功能测试
 False
```bash
 True# 编译
 Truemkdir build && cd build
 Truecmake ..
 Truecmake --build .
 True
 True# 运行
 True./SimpleDatabase
 True
 True# 测试命令
 True> set name John
 True> get name
 True> set age 30
 True> get age
 True> del name
 True> get name
 True> exit
 True
 True# 再次运行，测试持久化
 True./SimpleDatabase
 True> get age
 True> exit
 True```

 False## 4. 最佳实践
 False
 False### 4.1 代码组织
 False
 False- **模块化设计**: 将功能分解为独立的模块
 False- **清晰的接口**: 定义明确的类和函数接口
 False- **命名规范**: 使用一致的命名约定
 False- **代码注释**: 为复杂代码添加注释
 False
 False### 4.2 错误处理
 False
 False- **异常处理**: 使用异常处理错误情况
 False- **错误日志**: 记录错误信息
 False- **边界检查**: 检查输入参数和边界条件
 False- **资源管理**: 使用 RAII 管理资源
 False
 False### 4.3 性能优化
 False
 False- **内存管理**: 合理使用内存，避免内存泄漏
 False- **并发处理**: 使用线程池处理并发任务
 False- **I/O 优化**: 减少 I/O 操作，使用缓冲
 False- **算法选择**: 选择合适的算法和数据结构
 False
 False### 4.4 测试与调试
 False
 False- **单元测试**: 为关键功能编写单元测试
 False- **集成测试**: 测试模块间的交互
 False- **性能测试**: 测试系统性能
 False- **调试工具**: 使用调试工具定位问题
 False
 False### 4.5 部署与维护
 False
 False- **构建系统**: 使用 CMake 管理构建
 False- **版本控制**: 使用 Git 管理代码
 False- **文档**: 编写项目文档
 False- **监控**: 监控系统运行状态
 False
 False## 5. 延伸阅读
 False
 False- [C++ Core Guidelines](https://github.com/isocpp/CppCoreGuidelines)
 False- [Effective C++](https://www.amazon.com/Effective-Specific-Improve-Programs-Designs/dp/0321334876)
 False- [C++ Concurrency in Action](https://www.amazon.com/C-Concurrency-Action-Practical-Multithreading/dp/1933988770)
 False- [Networking in C++](https://www.amazon.com/Network-Programming-Windows-Second-Edition/dp/0735617216)
 False- [File System Library](https://en.cppreference.com/w/cpp/filesystem)
 False
 False## 6. 更新日志
 False
 False- **2026-04-05**: 初始化项目实战，涵盖简易文件管理器的设计与核心实现
 False- **2026-04-05**: 扩展内容，增加 HTTP 服务器和简单数据库系统项目
 False