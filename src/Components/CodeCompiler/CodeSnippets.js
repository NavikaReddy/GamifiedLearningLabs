export const CODE_SNIPPETS = {
   
    python: `\ndef fun(name):\n\tprint("Hello, " + name + "!")\n\n`,
    java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
    c: `\n#include <stdio.h>\n\nvoid fun(const char* name) {\n\tprintf("Hello, %s!\\n", name);\n}\n\nint main() {\n\tfun("world");\n\treturn 0;\n}\n`,
    cpp: `\n#include <iostream>\nusing namespace std;\n\nvoid fun(string name) {\n\tcout << "Hello, " << name << "!" << endl;\n}\n\nint main() {\n\tfun("World");\n\treturn 0;\n}\n`,
  };
  