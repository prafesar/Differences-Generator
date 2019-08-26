[![Build Status](https://travis-ci.org/prafesar/Differences-Generator.svg?branch=master)](https://travis-ci.org/prafesar/Differences-Generator)

[![Maintainability](https://api.codeclimate.com/v1/badges/ba1d3e5fd7456c0d7726/maintainability)](https://codeclimate.com/github/prafesar/project-lvl2-s487/maintainability)

## Генератор отличий конфигурационных файлов

Второй учебный проект в рамках курса [Frontend JavaScript](https://ru.hexlet.io/professions/frontend). Является логическим развитием [первого](https://github.com/prafesar/Simple-Brain-Games). Охватывает большую часть синтаксических возможностей `js` и использует более сложную архитектуру.

### Цель проекта

Реализация утилиты для поиска отличий в концигурационных файлах.

```bash
gendiff -h

  Usage: gendiff [options] <firstConfig> <secondConfig>
  Compares two configuration files and shows a difference.
  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -f, --format [type]  Output format
```

Возможности утилиты:

- Поддержка разных форматов
- Генерация отчета в виде plain text, pretty и json

Пример использования:

```bash
$ gendiff --format plain first-config.ini second-config.ini
Setting "common.setting2" deleted.
Setting "common.setting4" added with value "blah blah".
Setting "group1.baz" changed from "bas" to "bars".
Section "group2" deleted.
```

Демонстрационное видео:

[![asciicast](https://asciinema.org/a/3LZBWxRqgkzmyx7a3WOnIBZAx.svg)](https://asciinema.org/a/3LZBWxRqgkzmyx7a3WOnIBZAx)

### Полученные навыки

- Создание `cli` приложения с использованием библиотек, занимающихся  парсингом входных параметров, валидацией и генерацией помощи.
- Работа с форматами данных: `json`, `yaml`, `ini`. Транслирование данных из `js` в эти форматы и обратно.
- Обработка и трансформация древовидных структур данных.
- Построение абстрактного синтаксического дерева.
- Архитектурные принципы: Фабрика, Фасад, Адаптер.
- Полифорфизм, динамическая диспетчеризация по типу данных.
- Функциональное программирование.