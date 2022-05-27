# Gooz Client User Document

## Introduction

---

Gooz Client is a web application to communicate with microcontrollers. Client provides sending commands to microcontrollers, visual interface for data monitoring and tools for specific peripheral devices. 

## Layouts

---

Gooz Client has three main layouts: navigation bar, side bar and container.

![Area surrounded by red is Navigation Bar, blue is Side Bar and green is Container.]![Layouts](https://user-images.githubusercontent.com/75067014/170726491-216c1764-a378-4369-a3e3-d330dbce35a6.png)

Area surrounded by red is Navigation Bar, blue is Side Bar and green is Container.

### Navigation Bar

---

The Navigation Bar consists of three main parts in itself. The first of these parts is **The Brand Part** with “GOOZ Client”. The second part is **The Workspace Tabs Part** which includes workspaces created by the users. In this part, users could delete and switch their own workspaces. The last part is **The Register Part** contains the register button. This part redirects to the registration page.

![Navbar](https://user-images.githubusercontent.com/75067014/170726595-bd26ac60-6331-4455-a2eb-028c23080d47.png)

### Side Bar

---

![Sidebar1](https://user-images.githubusercontent.com/75067014/170726692-2f15281d-feca-4197-8b43-e83c40639ecc.png)

The Side Bar shows the properties of created workspace. This bar consists of 3 parts. The first of these parts is **Card’s Info***.* This part contains the data entered by the user. These data are *Workspace Name*, *Card Name*, *Card Type*, *Connection Type,* and *Connection Address*. For example, If ‘Workspace Name’ is called ‘Workspace 5’, ‘Card Name’ is called ‘Gooz’ and ‘Card Type’ is chosen as ‘esp32’, ‘Connection Type’ is chosen ‘com-port’, ‘Connection Address’ is chosen ‘COM5’, this part looks like the figure. The second of these part is **Widgets**. The user accesses the terminal and line chart from this part.

### Container

---

The container contains the widgets and makes them show up neatly.

![Container](https://user-images.githubusercontent.com/75067014/170726793-8367a128-2905-4bdd-98a7-22f5eb20ed03.png)

## **Specifications**

---

### Terminal

---

The Terminal on the client connects to Gooz’s terminal and allows to communicate with Gooz. The terminal generally works like a normal terminal. With this terminal, the user can send various commands to the card and receives various outputs from cards. 

![Terminal_1.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9e758a10-aa6c-4150-9e12-19ee8ac6851d/Terminal_1.png)

![Terminal_2.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5677ed60-163d-4c03-950e-99c5e833b743/Terminal_2.png)

### Data Monitoring

---

The user can perform data monitoring by using the Line Chart in the widgets section. A chart type is selected by the user from the Line Chart section and the line chart of that type is displayed on the screen. Data that come from the card is shown on this line chart and instantaneous changes in data are reflected instantly on the line chart. There are two chart types that the user can choose from. One of these types is the temperature line chart. This chart shows the temperature of the CPU. 

![Temperature.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5908f649-7d24-432e-9568-9474d5ec47d3/Temperature.png)

Another type is the ADC (Analog to Digital Converter) line chart. This chart reads the analog value from the pin, converts it to digital, and prints it as output.

![ADC_1.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8f708f80-e7dd-4fa0-9e95-97cb3e9456a0/ADC_1.png)

![ADC_2.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/91dfa4db-8930-4a24-af0d-e3c972fa27e8/ADC_2.png)

### Servo Interface

---

Servo Interface provides controlling servo motor with angle.

![Servo_1.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bfb3691d-e496-487c-b187-2612665fc64a/Servo_1.png)

![Servo_2.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b1e4b29a-3c24-47f5-a3dc-937f3cec3b8e/Servo_2.png)

## Usage

---

- Clicking ‘**GOOZ Client’**, directs you to the home page.

![goozclientbutton.jpeg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/718eae04-f421-4433-bece-39f4926cf2af/goozclientbutton.jpeg)

- Pressing the ‘**+**’ button will take you to the registration page. After the values are written in the input fields, the workspace is saved by pressing the ‘**Add New Workspace**’ button.

![+ butonu.jpeg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/74de6cba-34d1-4ce4-9712-be0ff223ae5d/_butonu.jpeg)

![add.jpeg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4a6d6792-3262-447d-add1-9fcf793e730b/add.jpeg)

- The workspace can be deleted by pressing the ‘**x**’ button next to the workspace name or the user can navigate among workspaces.

![workspaceler.jpeg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/402704cf-17fb-4cf8-a657-7e598be86cca/workspaceler.jpeg)

- The values entered in the register field are displayed by clicking the ‘**Card's Info’** button in the Side Bar.

![Cards_Info.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3860253d-65f6-4961-850d-35447983908e/Cards_Info.png)

- Terminal or Line Chart selection is made by clicking on the ‘**Widgets’** area.

![Widgets.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b24b4f81-bc06-44d2-9702-e7acb922adc8/Widgets.png)

- Pressing the ‘**Terminal’** area opens the terminal. The command is entered in the white area under the terminal and the command is sent to the card by clicking the send button. Then the outputs are printed to the terminal. The terminal can be closed by pressing the red ‘**x’** button in the upper right corner of the terminal screen.
    
    ![Terminal_1.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5c994f59-7c4e-4faa-ba1d-524452f5e548/Terminal_1.png)
    
    ![Terminal_2.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cb958d7c-883a-4492-9753-307ef1802a88/Terminal_2.png)
    
- The chart type is selected by clicking on the ‘**LineChart’** field, and the line chart is created in the container layout according to the chart type selected by clicking the ‘**Add’** button, or it is canceled by clicking the ‘**Cancel**’ button. The line chart can be closed by clicking the ‘**x**’ button in the upper right corner of the line chart.
