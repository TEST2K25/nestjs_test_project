import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AddExpenseDto } from './dto/add-entry.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './entities/expense.entity';
import { Model } from 'mongoose';
import { EditExpenseDto } from './dto/edit-entry.dto';
import { EditExpense } from './entities/editedexpense.entity';
import { DeleteExpense } from './entities/deletedexpense.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name) private readonly expenseModel: Model<Expense>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(EditExpense.name)
    private readonly editExpenseModel: Model<EditExpense>,
    @InjectModel(DeleteExpense.name)
    private readonly deleteExpenseModel: Model<DeleteExpense>,
  ) {}

  // to get all expense entry of user
  async getUserExpense(req) {
    try {
      // only admin allowed to fecth all users
      const user = await this.userModel.findById(req.user.userId);
      if (user.accessType !== 'admin')
        throw new UnauthorizedException('Sorry !Unauthorized Access');
      // find all entries related to user
      const allExpense = await this.expenseModel.find({
        createdBy: req.user.userId,
      });

      return {
        message: 'Expense Data get Success',
        data: allExpense,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // add expense entry
  async addExpenseEntry(addExpenseDto: AddExpenseDto, req: any) {
    console.log('expense entry dto is', addExpenseDto, req.user);
    try {
      // only admin allowed to add expense
      const user = await this.userModel.findById(req.user.userId);
      if (user.accessType !== 'admin')
        throw new UnauthorizedException('Sorry !Admin can add expense');
      // check date validation
      if (new Date() < new Date(addExpenseDto.expenseDate)) {
        throw new BadRequestException("You can't add in future");
      }
      //  create an expense entry
      const addExpense = await new this.expenseModel({
        createdBy: req.user.userId,
        ...addExpenseDto,
      });
      await addExpense.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // edit exisiting user entry
  async editExpenseEntry(editExpenseDto: EditExpenseDto, req) {
    console.log('The editDto is', editExpenseDto);
    try {
      // only admin allowed to add expense
      const user = await this.userModel.findById(req.user.userId);
      if (user.accessType !== 'admin')
        throw new UnauthorizedException('Sorry !Unauthorized Access');
      // find entry and create new entry to the editexpense
      const prevExpenseEntry = await this.expenseModel.findOne({
        _id: editExpenseDto._id,
      });
      console.log('Prev expense entry is', prevExpenseEntry);

      // // create new edit entry
      const data = {
        createdBy: prevExpenseEntry.createdBy,
        expenseType: prevExpenseEntry.expenseType,
        expenseAmount: prevExpenseEntry.expenseAmount,
        expenseDate: prevExpenseEntry.expenseDate,
        expenseCategory: prevExpenseEntry.expenseCategory,
        expenseDesc: prevExpenseEntry.expenseDesc,
        editBy: prevExpenseEntry.createdBy,
        referedEntry: prevExpenseEntry._id,
        editDate: new Date(),
      };
      console.log('The data is:-', data);
      const newEditEntry = new this.editExpenseModel(data);
      await newEditEntry.save();
      //find the document according to doc id in document
      const expenseEntry = await this.expenseModel.findByIdAndUpdate(
        editExpenseDto._id,
        { ...editExpenseDto },
      );
      expenseEntry.save();

      return {
        message: 'Successfully Edited ',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // delete entry
  async deleteExpenseEntry(param: string, req) {
    try {
      // only admin allowed to add expense
      const user = await this.userModel.findById(req.user.userId);
      if (user.accessType !== 'admin')
        throw new UnauthorizedException('Sorry !Unauthorized Access');
      console.log('Delete param id is', param);
      // find out the document exist or not
      const deleteEntry = await this.expenseModel.findById(param);

      if (!deleteEntry) {
        throw new Error('Document is not avilable');
      }

      // save it to delete document before delete it
      // // create new edit entry
      const data = {
        createdBy: deleteEntry.createdBy,
        expenseType: deleteEntry.expenseType,
        expenseAmount: deleteEntry.expenseAmount,
        expenseDate: deleteEntry.expenseDate,
        expenseCategory: deleteEntry.expenseCategory,
        expenseDesc: deleteEntry.expenseDesc,
        deleteBy: deleteEntry.createdBy,
        referedEntry: deleteEntry._id,
        deleteDate: new Date(),
      };
      console.log('The data is:-', data);
      const newDeleteEntry = new this.deleteExpenseModel(data);
      await newDeleteEntry.save();

      // delete that entry from expense model
      await this.expenseModel.findByIdAndDelete(param);

      return {
        message: 'Successfully deleted entry',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
