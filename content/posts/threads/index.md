---
title: Multithreading en Python
description: Python Multithreading
date: '2024-06-06'
draft: false
slug: /pensieve/threads
tags: ["Python", "Dev", "Multithreading"]
---



[Full article](https://medium.com/@fedihamdi.jr/multithreading-en-python-3374f6b7dbd7) | 3 min read | 

<img src="https://jedyang.com/post/multithreading-in-python-pytorch-using-c++-extension/featured.png" alt="Fedi HAMDI" height="200" width="100"/>

Comment le multithreading de Python diffère des autres langages de programmation

# Introduction 🌟

Python, comme de nombreux langages de programmation, prend en charge le multithreading. Cependant, les capacités de multithreading de Python sont distinctes en raison du Global Interpreter Lock (GIL), ce qui impacte son efficacité. Dans cet article, nous allons explorer le multithreading de Python, le rôle du GIL et comment il se compare à d’autres langages de programmation.

# Comprendre les processus et les threads

## Qu’est-ce qu’un processus ?
Un processus est une instance d’un programme s’exécutant sur votre ordinateur. Chaque processus fonctionne de manière indépendante avec son propre espace mémoire. Lorsque vous exécutez un programme, il devient un processus, qui peut être mono-thread ou multi-thread. Un processus mono-thread exécute une tâche à la fois.

## Qu’est-ce qu’un thread ?
Les threads sont des unités plus petites d’un processus qui peuvent s’exécuter simultanément. Par exemple, un programme qui calcule le carré et le cube des nombres peut utiliser des threads pour effectuer les deux calculs simultanément.

## Exemple mono-thread

```python
def calculate_square():
    for i in range(1, 101):
        square = i ** 2
        print(f"Le carré de {i} est : {square}")

if __name__ == "__main__":
    calculate_square()
```

## Exemple multi-thread 

```python
import threading

def calculate_square():
    for i in range(1, 101):
        square = i ** 2
        print(f"Le carré de {i} est : {square}")

def calculate_cube():
    for i in range(1, 101):
        cube = i ** 3
        print(f"Le cube de {i} est : {cube}")

if __name__ == "__main__":
    square_thread = threading.Thread(target=calculate_square)
    cube_thread = threading.Thread(target=calculate_cube)
    square_thread.start()
    cube_thread.start()
    square_thread.join()
    cube_thread.join()
```

# Continue reading 🏡

[Full article](https://medium.com/@fedihamdi.jr/multithreading-en-python-3374f6b7dbd7)