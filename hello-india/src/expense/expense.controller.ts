import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { AddExpenseDto } from './dto/add-entry.dto';
import { EditExpenseDto } from './dto/edit-entry.dto';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  // get all expense entries
  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserExpense(@Request() req) {
    return this.expenseService.getUserExpense(req);
  }

  // add new expense entry
  @Post()
  @UseGuards(JwtAuthGuard)
  async addExpenseEntry(@Body() addExpenseDto: AddExpenseDto, @Request() req) {
    return this.expenseService.addExpenseEntry(addExpenseDto, req);
  }

  // edit existing entry
  @Put()
  @UseGuards(JwtAuthGuard)
  async editExpenseEntry(
    @Body() editExpenseDto: EditExpenseDto,
    @Request() req,
  ) {
    return this.expenseService.editExpenseEntry(editExpenseDto, req);
  }

  // delete entry
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteExpenseEntry(@Param('id') param: string, @Request() req) {
    return this.expenseService.deleteExpenseEntry(param, req);
  }
}
