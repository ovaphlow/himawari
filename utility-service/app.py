from concurrent import futures
import json
import logging
import os

from openpyxl import load_workbook
import grpc

import file_pb2
import file_pb2_grpc


class File(file_pb2_grpc.FileServicer):

    def ParseXlsx(self, request, context):
        print(request.file_name)
        file_path = os.path.join('temp_file', request.file_name)
        wb = load_workbook(filename=file_path)
        for sheet in wb:
            print(len(tuple(sheet.rows)), '行')
            print(sheet.cell(row=1, column=1).value)
            for i in range(2, len(tuple(sheet.rows)) + 1):
                print('档案号', sheet.cell(row=i, column=2).value)
                print('姓名', sheet.cell(row=i, column=3).value)
                print('身份证', sheet.cell(row=i, column=4).value)
                print('出生日期', sheet.cell(row=i, column=5).value)
                print('电话', sheet.cell(row=i, column=6).value)
                print('备注', sheet.cell(row=i, column=7).value)
        resp = {}
        resp['message'] = ''
        resp['content'] = ''
        return file_pb2.Reply(data=json.dumps(resp))


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=8))
    file_pb2_grpc.add_FileServicer_to_server(File(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print('UTILITY-SERVICE 运行于端口: %s' % (50051,))
    server.wait_for_termination()


if __name__ == '__main__':
    logging.basicConfig()
    serve()
