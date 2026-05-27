# Java Swing 图形界面 | Swing GUI
 False
 False> @Author: fanquanpp
 False> @Category: Java Basics
 False> @Description: Java Swing 图形界面 | Swing GUI
 False> @Updated: 2026-05-03
 False
 False---
 False
 False## 目录
 False
 False1. [Swing 概述 | Swing Overview](#swing-概述-|-swing-overview)
 False2. [Swing 基础组件 | Basic Components](#swing-基础组件-|-basic-components)
 False3. [布局管理器 | Layout Managers](#布局管理器-|-layout-managers)
 False4. [事件处理 | Event Handling](#事件处理-|-event-handling)
 False5. [Swing 高级特性 | Advanced Features](#swing-高级特性-|-advanced-features)
 False6. [外观与感觉 | Look and Feel](#外观与感觉-|-look-and-feel)
 False7. [实战示例 | Practical Examples](#实战示例-|-practical-examples)
 False8. [最佳实践 | Best Practices](#最佳实践-|-best-practices)
 False9. [总结 | Summary](#总结-|-summary)
 False
 False---
 False
 False## 1. Swing 概述 | Swing Overview
 False
 FalseSwing 是 Java 提供的一个 GUI (图形用户界面) 工具包，是 AWT (Abstract Window Toolkit) 的增强版本。Swing 提供了丰富的组件和功能，用于创建跨平台的桌面应用程序。
 False
 False### 1.1 Swing 的特点
 False
 False- **纯 Java 实现**：Swing 组件完全由 Java 实现，不依赖于底层操作系统的 GUI 组件
 False- **跨平台**：相同的 Swing 代码可以在不同的操作系统上运行，保持一致的外观和行为
 False- **轻量级组件**：Swing 组件不依赖于本地平台的 GUI 组件，而是在 Java 中模拟实现
 False- **丰富的组件**：提供了大量的 GUI 组件，如按钮、文本框、列表、表格等
 False- **可定制性**：可以通过 Look and Feel 机制更改应用程序的外观
 False- **事件驱动**：基于事件处理模型，响应用户的操作
 False
 False### 1.2 Swing 与 AWT 的区别
 False
 False| 特性 | AWT | Swing |
 False|------|-----|-------|
 False| 实现方式 | 依赖本地平台 GUI 组件 | 纯 Java 实现 |
 False| 组件类型 | 重量级组件 | 轻量级组件 |
 False| 外观一致性 | 依赖平台，不同平台外观不同 | 跨平台一致的外观 |
 False| 组件丰富度 | 基础组件 | 丰富的组件库 |
 False| 性能 | 通常更快 | 可能稍慢但更灵活 |
 False
 False## 2. Swing 基础组件 | Basic Components
 False
 FalseSwing 提供了丰富的 GUI 组件，以下是一些常用的基础组件：
 False
 False### 2.1 顶层容器
 False
 False- **JFrame**：主窗口，包含标题栏、最小化/最大化/关闭按钮
 False- **JDialog**：对话框窗口，通常用于显示消息或获取用户输入
 False- **JApplet**：小程序容器，用于在网页中运行 Java 应用
 False
 False### 2.2 中间组件
 False
 False- **JPanel**：面板，用于组织和布局其他组件
 False- **JScrollPane**：带滚动条的面板，用于显示超出容器大小的内容
 False- **JSplitPane**：分割面板，用于将容器分为两个可调整大小的部分
 False- **JTabbedPane**：选项卡面板，用于在同一区域显示多个面板
 False
 False### 2.3 基本控件
 False
 False- **JButton**：按钮，用于触发操作
 False- **JTextField**：文本输入框，用于输入单行文本
 False- **JTextArea**：文本区域，用于输入多行文本
 False- **JLabel**：标签，用于显示文本或图像
 False- **JCheckBox**：复选框，用于选择多个选项
 False- **JRadioButton**：单选按钮，用于从多个选项中选择一个
 False- **JComboBox**：下拉列表，用于从预定义选项中选择
 False- **JList**：列表，用于显示多个选项
 False- **JTable**：表格，用于显示二维数据
 False- **JSlider**：滑块，用于在范围内选择值
 False- **JProgressBar**：进度条，用于显示操作进度
 False
 False## 3. 布局管理器 | Layout Managers
 False
 False布局管理器负责组件在容器中的排列方式，Swing 提供了多种布局管理器：
 False
 False### 3.1 FlowLayout
 False
 False- **特点**：组件按照从左到右、从上到下的顺序排列
 False- **适用场景**：简单的组件排列，如按钮组
 False- **示例**：
 False
```java
 TrueJPanel panel = new JPanel();
 Truepanel.setLayout(new FlowLayout());
 Truepanel.add(new JButton("Button 1"));
 Truepanel.add(new JButton("Button 2"));
 Truepanel.add(new JButton("Button 3"));
 True```

 False### 3.2 BorderLayout
 False
 False- **特点**：将容器分为东、西、南、北、中五个区域
 False- **适用场景**：主窗口布局，如菜单栏在北，状态栏在南，内容在中
 False- **示例**：
 False
```java
 TrueJFrame frame = new JFrame("BorderLayout Example");
 Trueframe.setLayout(new BorderLayout());
 Trueframe.add(new JButton("North"), BorderLayout.NORTH);
 Trueframe.add(new JButton("South"), BorderLayout.SOUTH);
 Trueframe.add(new JButton("East"), BorderLayout.EAST);
 Trueframe.add(new JButton("West"), BorderLayout.WEST);
 Trueframe.add(new JButton("Center"), BorderLayout.CENTER);
 True```

 False### 3.3 GridLayout
 False
 False- **特点**：将容器分为规则的网格，每个单元格大小相同
 False- **适用场景**：需要整齐排列的组件，如计算器按钮
 False- **示例**：
 False
```java
 TrueJPanel panel = new JPanel();
 Truepanel.setLayout(new GridLayout(3, 3)); // 3行3列
 Truefor (int i = 1; i <= 9; i++) {
 True panel.add(new JButton("" + i));
 True}
 True```

 False### 3.4 GridBagLayout
 False
 False- **特点**：灵活的网格布局，可以指定组件的位置、大小和权重
 False- **适用场景**：复杂的布局需求
 False- **示例**：
 False
```java
 TrueJPanel panel = new JPanel();
 Truepanel.setLayout(new GridBagLayout());
 TrueGridBagConstraints gbc = new GridBagConstraints();
 True
 True// 添加第一个组件
 TrueJButton button1 = new JButton("Button 1");
 Truegbc.gridx = 0;
 Truegbc.gridy = 0;
 Truegbc.gridwidth = 1;
 Truegbc.gridheight = 1;
 Truegbc.fill = GridBagConstraints.HORIZONTAL;
 Truepanel.add(button1, gbc);
 True
 True// 添加第二个组件
 TrueJButton button2 = new JButton("Button 2");
 Truegbc.gridx = 1;
 Truegbc.gridy = 0;
 Truegbc.gridwidth = 2;
 Truegbc.fill = GridBagConstraints.HORIZONTAL;
 Truepanel.add(button2, gbc);
 True```

 False### 3.5 CardLayout
 False
 False- **特点**：在同一区域显示多个组件，但每次只显示一个
 False- **适用场景**：选项卡式界面，如向导或多步骤表单
 False- **示例**：
 False
```java
 TrueJPanel panel = new JPanel();
 TrueCardLayout cardLayout = new CardLayout();
 Truepanel.setLayout(cardLayout);
 True
 True// 添加卡片
 Truepanel.add(new JButton("Card 1"), "card1");
 Truepanel.add(new JButton("Card 2"), "card2");
 Truepanel.add(new JButton("Card 3"), "card3");
 True
 True// 显示特定卡片
 TruecardLayout.show(panel, "card2");
 True```

 False## 4. 事件处理 | Event Handling
 False
 FalseSwing 使用事件处理模型来响应用户的操作，主要包括以下几个部分：
 False
 False### 4.1 事件类型
 False
 False- **ActionEvent**：按钮点击、菜单项选择等操作
 False- **MouseEvent**：鼠标点击、移动、拖动等操作
 False- **KeyEvent**：键盘按键操作
 False- **WindowEvent**：窗口打开、关闭、最小化等操作
 False- **FocusEvent**：组件获得或失去焦点的操作
 False
 False### 4.2 事件监听器
 False
 False事件监听器是实现了特定接口的对象，用于处理特定类型的事件：
 False
 False- **ActionListener**：处理 ActionEvent
 False- **MouseListener**：处理 MouseEvent
 False- **KeyListener**：处理 KeyEvent
 False- **WindowListener**：处理 WindowEvent
 False- **FocusListener**：处理 FocusEvent
 False
 False### 4.3 事件处理示例
 False
```java
 Trueimport javax.swing.*;
 Trueimport java.awt.event.*;
 True
 Truepublic class EventHandlingExample {
 True public static void main(String[] args) {
 True JFrame frame = new JFrame("Event Handling Example");
 True frame.setSize(300, 200);
 True frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
 True 
 True JPanel panel = new JPanel();
 True JButton button = new JButton("Click Me");
 True 
 True // 添加动作监听器
 True button.addActionListener(new ActionListener() {
 True @Override
 True public void actionPerformed(ActionEvent e) {
 True JOptionPane.showMessageDialog(frame, "Button clicked!");
 True }
 True });
 True 
 True panel.add(button);
 True frame.add(panel);
 True frame.setVisible(true);
 True }
 True}
 True```

 False### 4.4 适配器类
 False
 False为了简化事件监听器的实现，Swing 提供了适配器类，这些类实现了相应的监听器接口，但所有方法都是空实现：
 False
 False- **MouseAdapter**：实现 MouseListener 接口
 False- **KeyAdapter**：实现 KeyListener 接口
 False- **WindowAdapter**：实现 WindowListener 接口
 False- **FocusAdapter**：实现 FocusListener 接口
 False
 False使用适配器类可以只重写需要的方法，而不是实现所有方法：
 False
```java
 Truebutton.addMouseListener(new MouseAdapter() {
 True @Override
 True public void mouseClicked(MouseEvent e) {
 True System.out.println("Mouse clicked!");
 True }
 True});
 True```

 False## 5. Swing 高级特性 | Advanced Features
 False
 False### 5.1 对话框 | Dialogs
 False
 FalseSwing 提供了多种对话框，用于显示消息、获取用户输入等：
 False
 False- **JOptionPane**：显示消息、确认、输入等对话框
 False- **JFileChooser**：文件选择对话框
 False- **JColorChooser**：颜色选择对话框
 False
 False示例：
 False
```java
 True// 显示消息对话框
 TrueJOptionPane.showMessageDialog(frame, "Hello, Swing!");
 True
 True// 显示确认对话框
 Trueint option = JOptionPane.showConfirmDialog(frame, "Are you sure?");
 Trueif (option == JOptionPane.YES_OPTION) {
 True System.out.println("User clicked Yes");
 True}
 True
 True// 显示输入对话框
 TrueString input = JOptionPane.showInputDialog(frame, "Enter your name:");
 TrueSystem.out.println("User entered: " + input);
 True
 True// 显示文件选择对话框
 TrueJFileChooser fileChooser = new JFileChooser();
 Trueint result = fileChooser.showOpenDialog(frame);
 Trueif (result == JFileChooser.APPROVE_OPTION) {
 True System.out.println("Selected file: " + fileChooser.getSelectedFile());
 True}
 True
 True// 显示颜色选择对话框
 TrueColor color = JColorChooser.showDialog(frame, "Choose a color", Color.RED);
 TrueSystem.out.println("Selected color: " + color);
 True```

 False### 5.2 菜单 | Menus
 False
 FalseSwing 提供了完整的菜单系统，包括菜单栏、菜单和菜单项：
 False
```java
 TrueJFrame frame = new JFrame("Menu Example");
 Trueframe.setSize(400, 300);
 Trueframe.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
 True
 True// 创建菜单栏
 TrueJMenuBar menuBar = new JMenuBar();
 True
 True// 创建文件菜单
 TrueJMenu fileMenu = new JMenu("File");
 TrueJMenuItem newItem = new JMenuItem("New");
 TrueJMenuItem openItem = new JMenuItem("Open");
 TrueJMenuItem saveItem = new JMenuItem("Save");
 TrueJMenuItem exitItem = new JMenuItem("Exit");
 True
 True// 添加菜单项到文件菜单
 TruefileMenu.add(newItem);
 TruefileMenu.add(openItem);
 TruefileMenu.add(saveItem);
 TruefileMenu.addSeparator(); // 添加分隔线
 TruefileMenu.add(exitItem);
 True
 True// 创建编辑菜单
 TrueJMenu editMenu = new JMenu("Edit");
 TrueJMenuItem cutItem = new JMenuItem("Cut");
 TrueJMenuItem copyItem = new JMenuItem("Copy");
 TrueJMenuItem pasteItem = new JMenuItem("Paste");
 True
 True// 添加菜单项到编辑菜单
 TrueeditMenu.add(cutItem);
 TrueeditMenu.add(copyItem);
 TrueeditMenu.add(pasteItem);
 True
 True// 添加菜单到菜单栏
 TruemenuBar.add(fileMenu);
 TruemenuBar.add(editMenu);
 True
 True// 设置菜单栏
 Trueframe.setJMenuBar(menuBar);
 True
 True// 添加退出菜单项的监听器
 TrueexitItem.addActionListener(new ActionListener() {
 True @Override
 True public void actionPerformed(ActionEvent e) {
 True System.exit(0);
 True }
 True});
 True
 Trueframe.setVisible(true);
 True```

 False### 5.3 表格 | Tables
 False
 FalseJTable 组件用于显示和编辑二维数据：
 False
```java
 TrueJFrame frame = new JFrame("Table Example");
 Trueframe.setSize(500, 300);
 Trueframe.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
 True
 True// 列名
 TrueString[] columnNames = {"ID", "Name", "Age", "City"};
 True
 True// 数据
 TrueObject[][] data = {
 True {1, "John", 25, "New York"},
 True {2, "Mary", 30, "London"},
 True {3, "Bob", 35, "Paris"},
 True {4, "Alice", 28, "Tokyo"}
 True};
 True
 True// 创建表格
 TrueJTable table = new JTable(data, columnNames);
 True
 True// 添加滚动条
 TrueJScrollPane scrollPane = new JScrollPane(table);
 True
 Trueframe.add(scrollPane);
 Trueframe.setVisible(true);
 True```

 False### 5.4 树 | Trees
 False
 FalseJTree 组件用于显示层次结构数据：
 False
```java
 TrueJFrame frame = new JFrame("Tree Example");
 Trueframe.setSize(400, 300);
 Trueframe.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
 True
 True// 创建根节点
 TrueDefaultMutableTreeNode root = new DefaultMutableTreeNode("Root");
 True
 True// 创建子节点
 TrueDefaultMutableTreeNode node1 = new DefaultMutableTreeNode("Node 1");
 TrueDefaultMutableTreeNode node2 = new DefaultMutableTreeNode("Node 2");
 TrueDefaultMutableTreeNode node3 = new DefaultMutableTreeNode("Node 3");
 True
 True// 添加子节点到根节点
 Trueroot.add(node1);
 Trueroot.add(node2);
 Trueroot.add(node3);
 True
 True// 创建子子节点
 TrueDefaultMutableTreeNode node1_1 = new DefaultMutableTreeNode("Node 1.1");
 TrueDefaultMutableTreeNode node1_2 = new DefaultMutableTreeNode("Node 1.2");
 Truenode1.add(node1_1);
 Truenode1.add(node1_2);
 True
 True// 创建树
 TrueJTree tree = new JTree(root);
 True
 True// 添加滚动条
 TrueJScrollPane scrollPane = new JScrollPane(tree);
 True
 Trueframe.add(scrollPane);
 Trueframe.setVisible(true);
 True```

 False## 6. 外观与感觉 | Look and Feel
 False
 FalseSwing 允许通过 Look and Feel (L&F) 机制更改应用程序的外观：
 False
 False### 6.1 内置的 Look and Feel
 False
 False- **Metal**：默认的跨平台外观
 False- **Nimbus**：现代的跨平台外观
 False- **Windows**：Windows 风格的外观
 False- **Windows Classic**：经典 Windows 风格的外观
 False- **Motif**：Unix/Linux 风格的外观
 False- **Mac OS X**：Mac 风格的外观（仅在 Mac 系统上可用）
 False
 False### 6.2 设置 Look and Feel
 False
```java
 Trueimport javax.swing.*;
 Trueimport javax.swing.plaf.nimbus.NimbusLookAndFeel;
 True
 Truepublic class LookAndFeelExample {
 True public static void main(String[] args) {
 True try {
 True // 设置 Nimbus Look and Feel
 True UIManager.setLookAndFeel(new NimbusLookAndFeel());
 True // 或者使用系统默认的 Look and Feel
 True // UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
 True } catch (Exception e) {
 True e.printStackTrace();
 True }
 True 
 True // 创建并显示 GUI
 True JFrame frame = new JFrame("Look and Feel Example");
 True frame.setSize(300, 200);
 True frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
 True 
 True JPanel panel = new JPanel();
 True panel.add(new JButton("Button"));
 True panel.add(new JTextField(20));
 True panel.add(new JCheckBox("Check Box"));
 True 
 True frame.add(panel);
 True frame.setVisible(true);
 True }
 True}
 True```

 False## 7. 实战示例 | Practical Examples
 False
 False### 7.1 简单的计算器
 False
```java
 Trueimport javax.swing.*;
 Trueimport java.awt.*;
 Trueimport java.awt.event.*;
 True
 Truepublic class Calculator {
 True private JFrame frame;
 True private JTextField textField;
 True private String operator = "";
 True private double firstNumber = 0;
 True private boolean start = true;
 True 
 True public Calculator() {
 True frame = new JFrame("Calculator");
 True frame.setSize(300, 400);
 True frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
 True frame.setLayout(new BorderLayout());
 True 
 True // 创建文本框
 True textField = new JTextField();
 True textField.setFont(new Font("Arial", Font.PLAIN, 24));
 True textField.setHorizontalAlignment(JTextField.RIGHT);
 True frame.add(textField, BorderLayout.NORTH);
 True 
 True // 创建按钮面板
 True JPanel buttonPanel = new JPanel();
 True buttonPanel.setLayout(new GridLayout(4, 4, 5, 5));
 True 
 True // 按钮标签
 True String[] buttons = {
 True "7", "8", "9", "/",
 True "4", "5", "6", "*",
 True "1", "2", "3", "-",
 True "C", "0", "=", "+"
 True };
 True 
 True // 创建并添加按钮
 True for (String button : buttons) {
 True JButton btn = new JButton(button);
 True btn.setFont(new Font("Arial", Font.PLAIN, 18));
 True btn.addActionListener(new ButtonClickListener());
 True buttonPanel.add(btn);
 True }
 True 
 True frame.add(buttonPanel, BorderLayout.CENTER);
 True frame.setVisible(true);
 True }
 True 
 True private class ButtonClickListener implements ActionListener {
 True @Override
 True public void actionPerformed(ActionEvent e) {
 True String command = e.getActionCommand();
 True 
 True if (command.charAt(0) >= '0' && command.charAt(0) <= '9' || command.equals(".")) {
 True if (start) {
 True textField.setText("");
 True start = false;
 True }
 True textField.setText(textField.getText() + command);
 True } else if (command.equals("C")) {
 True textField.setText("");
 True operator = "";
 True firstNumber = 0;
 True start = true;
 True } else if (command.equals("=")) {
 True double secondNumber = Double.parseDouble(textField.getText());
 True double result = 0;
 True 
 True switch (operator) {
 True case "+":
 True result = firstNumber + secondNumber;
 True break;
 True case "-":
 True result = firstNumber - secondNumber;
 True break;
 True case "*":
 True result = firstNumber * secondNumber;
 True break;
 True case "/":
 True result = firstNumber / secondNumber;
 True break;
 True }
 True 
 True textField.setText(String.valueOf(result));
 True operator = "";
 True start = true;
 True } else {
 True if (!start) {
 True firstNumber = Double.parseDouble(textField.getText());
 True operator = command;
 True start = true;
 True }
 True }
 True }
 True }
 True 
 True public static void main(String[] args) {
 True new Calculator();
 True }
 True}
 True```

 False### 7.2 简单的文本编辑器
 False
```java
 Trueimport javax.swing.*;
 Trueimport java.awt.*;
 Trueimport java.awt.event.*;
 Trueimport java.io.*;
 True
 Truepublic class TextEditor {
 True private JFrame frame;
 True private JTextArea textArea;
 True private JMenuBar menuBar;
 True private JMenu fileMenu;
 True private JMenuItem newItem, openItem, saveItem, exitItem;
 True private File currentFile = null;
 True 
 True public TextEditor() {
 True frame = new JFrame("Text Editor");
 True frame.setSize(600, 400);
 True frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
 True 
 True // 创建文本区域
 True textArea = new JTextArea();
 True textArea.setFont(new Font("Arial", Font.PLAIN, 14));
 True JScrollPane scrollPane = new JScrollPane(textArea);
 True frame.add(scrollPane, BorderLayout.CENTER);
 True 
 True // 创建菜单栏
 True menuBar = new JMenuBar();
 True 
 True // 创建文件菜单
 True fileMenu = new JMenu("File");
 True 
 True // 创建菜单项
 True newItem = new JMenuItem("New");
 True openItem = new JMenuItem("Open");
 True saveItem = new JMenuItem("Save");
 True exitItem = new JMenuItem("Exit");
 True 
 True // 添加菜单项到文件菜单
 True fileMenu.add(newItem);
 True fileMenu.add(openItem);
 True fileMenu.add(saveItem);
 True fileMenu.addSeparator();
 True fileMenu.add(exitItem);
 True 
 True // 添加文件菜单到菜单栏
 True menuBar.add(fileMenu);
 True 
 True // 设置菜单栏
 True frame.setJMenuBar(menuBar);
 True 
 True // 添加事件监听器
 True newItem.addActionListener(new ActionListener() {
 True @Override
 True public void actionPerformed(ActionEvent e) {
 True textArea.setText("");
 True currentFile = null;
 True frame.setTitle("Text Editor");
 True }
 True });
 True 
 True openItem.addActionListener(new ActionListener() {
 True @Override
 True public void actionPerformed(ActionEvent e) {
 True JFileChooser fileChooser = new JFileChooser();
 True int result = fileChooser.showOpenDialog(frame);
 True if (result == JFileChooser.APPROVE_OPTION) {
 True currentFile = fileChooser.getSelectedFile();
 True try {
 True BufferedReader reader = new BufferedReader(new FileReader(currentFile));
 True textArea.read(reader, null);
 True reader.close();
 True frame.setTitle("Text Editor - " + currentFile.getName());
 True } catch (IOException ex) {
 True ex.printStackTrace();
 True }
 True }
 True }
 True });
 True 
 True saveItem.addActionListener(new ActionListener() {
 True @Override
 True public void actionPerformed(ActionEvent e) {
 True if (currentFile == null) {
 True JFileChooser fileChooser = new JFileChooser();
 True int result = fileChooser.showSaveDialog(frame);
 True if (result == JFileChooser.APPROVE_OPTION) {
 True currentFile = fileChooser.getSelectedFile();
 True } else {
 True return;
 True }
 True }
 True 
 True try {
 True BufferedWriter writer = new BufferedWriter(new FileWriter(currentFile));
 True textArea.write(writer);
 True writer.close();
 True frame.setTitle("Text Editor - " + currentFile.getName());
 True } catch (IOException ex) {
 True ex.printStackTrace();
 True }
 True }
 True });
 True 
 True exitItem.addActionListener(new ActionListener() {
 True @Override
 True public void actionPerformed(ActionEvent e) {
 True System.exit(0);
 True }
 True });
 True 
 True frame.setVisible(true);
 True }
 True 
 True public static void main(String[] args) {
 True new TextEditor();
 True }
 True}
 True```

 False## 8. 最佳实践 | Best Practices
 False
 False### 8.1 性能优化
 False
 False- **使用合适的布局管理器**：根据界面需求选择合适的布局管理器
 False- **避免过度使用重量级组件**：重量级组件可能影响性能
 False- **使用 SwingUtilities.invokeLater**：确保 GUI 操作在事件分发线程中执行
 False- **合理使用组件**：只创建必要的组件，避免创建过多组件
 False
 False### 8.2 代码组织
 False
 False- **使用 MVC 模式**：将模型、视图和控制器分离
 False- **模块化设计**：将功能划分为模块，提高代码可维护性
 False- **命名规范**：使用清晰的命名规范，提高代码可读性
 False- **注释**：添加适当的注释，说明代码的功能和逻辑
 False
 False### 8.3 用户体验
 False
 False- **响应式设计**：确保界面在不同大小的窗口中都能正常显示
 False- **合理的布局**：使用合理的布局，使界面美观易用
 False- **适当的反馈**：对用户操作提供适当的反馈，如进度条、消息框等
 False- **快捷键**：为常用操作提供快捷键，提高用户操作效率
 False
 False## 9. 总结 | Summary
 False
 FalseSwing 是 Java 提供的功能强大的 GUI 工具包，通过它可以创建跨平台的桌面应用程序。Swing 提供了丰富的组件和功能，包括各种控件、布局管理器、事件处理机制等。
 False
 False通过学习 Swing，你可以创建各种类型的桌面应用程序，从简单的计算器到复杂的文本编辑器。在实际开发中，应根据具体需求选择合适的组件和布局管理器，并遵循相关的最佳实践，以创建美观、高效、用户友好的应用程序。
 False