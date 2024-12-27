import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { AddResourceDto, ResourceUpdateDto } from './dto/resource.dto';
import { Resource } from './entities/resource.entity';
import { Req_Int } from 'src/interface/common';

@Injectable()
export class ResourceService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Resource.name) private readonly resourceModel: Model<Resource>,
  ) {}

  // get resource
  async getResource(req) {
    try {
      console.log('User details from auth is ', req.user);
      // check user
      const user = await this.userModel.findById(req?.user.userId);

      if (!user) throw new UnauthorizedException('User not found');

      if (user.accessType === 'admin') {
        // find all resources and send
        const allResourcse = await this.resourceModel
          .find()
          .populate('createdBy', 'userName userEmail');
        return {
          message: 'get response successfully',
          data: allResourcse,
        };
      }

      const allResourcse = await this.resourceModel.find({
        createdBy: req.user.userId,
      });
      return {
        message: 'get response successfully',
        data: allResourcse,
      };
    } catch (error) {
      throw new BadRequestException(error?.message || 'Unknow error');
    }
  }

  // add resource
  async addResource(addResourceDto: AddResourceDto, req: Req_Int) {
    try {
      // console.log('body data is', addResourceDto);
      // console.log('User validation data is ', req.user);

      // add new document to the resourceModel
      const newResource = new this.resourceModel({
        createdBy: req.user.userId,
        category: addResourceDto.category,
        resourceLink: addResourceDto.resourceLink,
      });
      await newResource.save();

      return {
        message: 'Successfully Added Resource ',
        data: newResource,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // delete resource
  async deleteResource(deleteId: string, req: Req_Int) {
    console.log('delete document id is', deleteId);
    console.log('Auth data is', req.user.userId);
    try {
      // find out the document and delete it
      const deletedDoc = await this.resourceModel.findOneAndDelete({
        _id: deleteId,
      });
      return {
        message: 'Successfully Deleted',
        data: deletedDoc,
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'Unknown error occured');
    }
  }

  // update important
  async updateImportant(
    updateId: string,
    resourceUpdateDto: ResourceUpdateDto,
    req: Req_Int,
  ) {
    console.log('body is:-', resourceUpdateDto);
    console.log('update id is:-', updateId);
    try {
      // find the document
      const updateDoc = await this.resourceModel.findById(updateId);

      if (req.user.userId != updateDoc.createdBy) {
        throw new UnauthorizedException('Only owner allowed to edit');
      }
      console.log('document is ', updateDoc);
      updateDoc.isResourceMustWatch = resourceUpdateDto.status;
      await updateDoc.save();
      return {
        message: 'Successfully updated',
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'Unknown Error');
    }
  }

  // update favourite
  async updateFavourite(
    updateId: string,
    resourceUpdateDto: ResourceUpdateDto,
    req: Req_Int,
  ) {
    console.log('body is:-', resourceUpdateDto);
    console.log('update id is:-', updateId);
    try {
      // find the document
      const updateDoc = await this.resourceModel.findById(updateId);
      if (req.user.userId != updateDoc.createdBy) {
        throw new UnauthorizedException('Only owner allowed to edit');
      }
      console.log('document is ', updateDoc);
      updateDoc.isResourceUserFvrt = resourceUpdateDto.status;
      await updateDoc.save();
      return {
        message: 'Successfully updated',
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'Unknown Error');
    }
  }

  // update watch later
  async updateWatchLater(
    updateId: string,
    resourceUpdateDto: ResourceUpdateDto,
    req: Req_Int,
  ) {
    console.log('body is:-', resourceUpdateDto);
    console.log('update id is:-', updateId);
    console.log('req source is', req);
    try {
      // find the document
      const updateDoc = await this.resourceModel.findById(updateId);
      // if (req.user.userId != updateDoc.createdBy) {
      //   throw new UnauthorizedException('Only owner allowed to edit');
      // }
      console.log('document is ', updateDoc);
      updateDoc.isResourceWatchLater = resourceUpdateDto.status;
      await updateDoc.save();
      return {
        message: 'Successfully updated',
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'Unknown Error');
    }
  }
}
