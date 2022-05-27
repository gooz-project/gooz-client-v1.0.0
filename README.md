# Gooz Client User Document

## Introduction


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

![Terminal_1](https://user-images.githubusercontent.com/75067014/170727448-46096309-cd77-46fe-baf5-de2f4afd7cb9.png)

![Terminal_2](https://user-images.githubusercontent.com/75067014/170727497-36bcfa74-9b5a-468a-a2fe-55eedc8d579a.png)

### Data Monitoring

---

The user can perform data monitoring by using the Line Chart in the widgets section. A chart type is selected by the user from the Line Chart section and the line chart of that type is displayed on the screen. Data that come from the card is shown on this line chart and instantaneous changes in data are reflected instantly on the line chart. There are two chart types that the user can choose from. One of these types is the temperature line chart. This chart shows the temperature of the CPU. 

![Temperature](https://user-images.githubusercontent.com/75067014/170727524-148b7b14-1c6f-417b-a685-30d9e35b5bc8.png)

Another type is the ADC (Analog to Digital Converter) line chart. This chart reads the analog value from the pin, converts it to digital, and prints it as output.

![ADC_1](https://user-images.githubusercontent.com/75067014/170727558-93ca4c75-5714-45b6-882c-559045382715.png)

![ADC_2](https://user-images.githubusercontent.com/75067014/170727581-95d57307-4821-4805-af66-9e7a1fe647c6.png)

### Servo Interface

---

Servo Interface provides controlling servo motor with angle.

![Servo_1](https://user-images.githubusercontent.com/75067014/170727609-189e3939-5651-4bb4-8148-92494bcdefd5.png)

![Servo_2](https://user-images.githubusercontent.com/75067014/170727627-54619341-b4b3-4291-b115-87674cf8829d.png)

## Usage

---

- Clicking ‘**GOOZ Client’**, directs you to the home page.

![goozclientbutton](https://user-images.githubusercontent.com/75067014/170727650-f3ee7f8a-d3dc-496d-98a3-524d82537fe2.jpeg)

- Pressing the ‘**+**’ button will take you to the registration page. After the values are written in the input fields, the workspace is saved by pressing the ‘**Add New Workspace**’ button.

![+ butonu](https://user-images.githubusercontent.com/75067014/170727668-eadf291c-86a9-405a-8d90-6bb865cc402b.jpeg)

!![add](https://user-images.githubusercontent.com/75067014/170727753-e5557160-c5c3-4ae7-ad1d-cb06278cac8d.jpeg)

- The workspace can be deleted by pressing the ‘**x**’ button next to the workspace name or the user can navigate among workspaces.

![workspaceler](https://user-images.githubusercontent.com/75067014/170727779-72988c71-a20b-4f53-b187-be283405a54c.jpeg)

- The values entered in the register field are displayed by clicking the ‘**Card's Info’** button in the Side Bar.

![Cards_Info](https://user-images.githubusercontent.com/75067014/170727808-4adb4888-59d7-4944-ab78-23fbee1b3007.png)

- Terminal or Line Chart selection is made by clicking on the ‘**Widgets’** area.

![Widgets](https://user-images.githubusercontent.com/75067014/170727836-bac6fa2e-f8f7-4d35-beaa-be3a23700a31.png)

- Pressing the ‘**Terminal’** area opens the terminal. The command is entered in the white area under the terminal and the command is sent to the card by clicking the send button. Then the outputs are printed to the terminal. The terminal can be closed by pressing the red ‘**x’** button in the upper right corner of the terminal screen.
    
    ![Terminal2_1](https://user-images.githubusercontent.com/75067014/170727865-0ffd8a9f-ec27-485c-a43e-3b46a94a6990.png)
    
    ![Terminal2_2](https://user-images.githubusercontent.com/75067014/170727988-6e2f4392-feb1-4ed0-94cc-e58095bfb512.png)
    
- The chart type is selected by clicking on the ‘**LineChart’** field, and the line chart is created in the container layout according to the chart type selected by clicking the ‘**Add’** button, or it is canceled by clicking the ‘**Cancel**’ button. The line chart can be closed by clicking the ‘**x**’ button in the upper right corner of the line chart.
