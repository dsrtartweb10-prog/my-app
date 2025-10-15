#!/usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import ora from "ora";

console.clear();

console.log(
  gradient.pastel.multiline(
    figlet.textSync("Modern CLI", {
      font: "Standard",
      horizontalLayout: "default",
    })
  )
);
console.log(chalk.gray("─────────────────────────────────────────────"));
console.log(chalk.cyanBright("Welcome to your interactive shell project 🚀"));
console.log(chalk.gray("─────────────────────────────────────────────\n"));

async function mainMenu() {
  const { menu } = await inquirer.prompt([
    {
      type: "list",
      name: "menu",
      message: "Pilih aksi yang ingin dilakukan:",
      choices: [
        "💡 Tentang Project",
        "🧮 Kalkulator Mini",
        "🎨 Ubah Tema Warna",
        "🚪 Keluar"
      ]
    }
  ]);

  switch (menu) {
    case "💡 Tentang Project":
      console.log(chalk.green("\nProject ini dibuat dengan Node.js + Shell modern CLI!"));
      break;

    case "🧮 Kalkulator Mini":
      await kalkulator();
      break;

    case "🎨 Ubah Tema Warna":
      console.log(gradient.rainbow("\n🌈 Tema warna diubah secara dinamis!"));
      break;

    case "🚪 Keluar":
      console.log(chalk.yellow("\nSampai jumpa lagi 👋"));
      process.exit(0);
  }

  console.log("\n");
  await mainMenu();
}

async function kalkulator() {
  const { a, b } = await inquirer.prompt([
    { type: "number", name: "a", message: "Masukkan angka pertama:" },
    { type: "number", name: "b", message: "Masukkan angka kedua:" }
  ]);

  const spinner = ora("Menghitung hasil...").start();
  await new Promise((res) => setTimeout(res, 1000));
  spinner.succeed(`Hasilnya: ${chalk.yellow(a + b)} ✨`);
}

await mainMenu();
